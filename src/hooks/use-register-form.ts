import { useMutation } from '@apollo/react-hooks';
import { useAuth } from './use-auth';
import { useInput } from 'react-hanger';

export const useRegisterForm = (registerMutation:any) => {
  const { afterAuth, showLogin } = useAuth();
  const name = useInput('');
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');

  const fields = [name, email, password];
  const isValid =
    fields.every(field => field.hasValue) &&
    password.value === confirmPassword.value;

  const [register, { loading }] = useMutation(registerMutation);

  const clearForm = () => {
    fields.forEach(field => field.clear());
  };

  const submit = async e => {
    e.preventDefault();

    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    try {
      const { data } = await register({
        variables: {
          user: newUser,
        },
      });
      afterAuth(data.register);
      clearForm();
    } catch (err) {
      if (err) {
        console.error(err);
        alert(err);
      }
    }
  };

  return {
    name,
    isValid,
    loading,
    showLogin,
    email,
    password,
    submit,
    confirmPassword,
  };
};
