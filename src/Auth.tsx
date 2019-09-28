import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { propFn } from './utils';
import { AuthContext } from './auth-context';

export const USER_TOKEN = 'user_token';
export const USER_OBJECT = 'user_object';

export const Auth: React.FC<{
  userDataPath?: string;
  userQuery?: any;
  loginForm?: any;
  registerForm?: any;
  localStorageTokenKey?: string;
  localStorageUserKey?: string;
  afterAuth?: ({ user, token }: { user: any; token: any }) => void;
}> = ({
  children,
  userDataPath = 'me',
  userQuery,
  loginForm,
  registerForm,
  localStorageTokenKey = USER_TOKEN,
  localStorageUserKey = USER_OBJECT,
  afterAuth: afterAuthProp,
}) => {
  const [user, setUser] = useState(() =>
    JSON.parse(window.localStorage.getItem(localStorageUserKey) || '')
  );
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    const token = window.localStorage.getItem(localStorageTokenKey);
    if (token) {
      client
        .query({
          query: userQuery,
        })
        .then(({ data }: any) => setUser(data[userDataPath]))
        .catch(logout);
    } else {
      logout();
    }
  }, []);

  const logout = () => {
    setUser(null);
    setShowRegisterForm(false);
    clearLocalStorage();
  };

  const clearLocalStorage = () => {
    window.localStorage.removeItem(localStorageTokenKey);
    window.localStorage.removeItem(localStorageUserKey);
  };

  //call this function after the user is registered of after he logs in
  const afterAuth = ({ user, token }: { user: any; token: any }) => {
    setUser(user);
    propFn(afterAuthProp, { user, token });
    window.localStorage.setItem(localStorageTokenKey, token);
    window.localStorage.setItem(localStorageUserKey, JSON.stringify(user));
  };

  const showAuth = !user;

  let showLogin = () => setShowRegisterForm(false);
  let showRegister = () => setShowRegisterForm(true);

  let contextValue = {
    user,
    setUser,
    logout,
    afterAuth,
    showLogin,
    showRegister,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {user && children}
      {showAuth &&
        propFn(showRegisterForm ? registerForm : loginForm, contextValue)}
    </AuthContext.Provider>
  );
};
