import ApolloClient from 'apollo-boost';
import { requestWithAuthorization } from './request-with-authorization';

export const createApolloClient = url =>
  new ApolloClient({
    uri: url,
    request: requestWithAuthorization,
  });
