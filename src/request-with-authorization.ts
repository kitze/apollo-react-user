import { USER_TOKEN } from './Auth';

export const requestWithAuthorization = async operation => {
  let userToken = window.localStorage.getItem(USER_TOKEN);
  operation.setContext({
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
