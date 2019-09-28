import ApolloClient from 'apollo-boost';
import { requestWithAuthorization } from './request-with-authorization';

export const createApolloClient = (url: string) =>
  new ApolloClient({
    uri: url,
    request: requestWithAuthorization,
  });
