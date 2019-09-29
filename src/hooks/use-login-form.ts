import { useMutation } from '@apollo/react-hooks';
import { useAuth } from './use-auth';
import { useInput } from 'react-hanger';

export const useLoginForm = (loginMutation: any) => {
  const { afterAuth, showRegister } = useAuth();
  const email = useInput('');
  const password = useInput('');

  const fields = [email, password];
  const isValid = fields.every(field => field.hasValue);

  const [login, { loading }] = useMutation(loginMutation);

  const clearForm = () => {
    fields.forEach(field => field.clear());
  };

  const submit = async e => {
    e && e.preventDefault();

    try {
      const { data } = await login({
        variables: {
          email: email.value,
          password: password.value,
        },
      });
      clearForm();
      afterAuth(data.login);
    } catch (err) {
      if (err) {
        console.error(err);
        alert(err);
      }
    }
  };

  return { isValid, loading, showRegister, email, password, submit };
};
