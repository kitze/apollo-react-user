import ApolloClient from 'apollo-boost';
import { requestWithAuthorization } from './request-with-authorization';
export const isProd = process.env.NODE_ENV === 'production';

export const createApolloClient = (
  localUrl: string,
  prodUrl: string = localUrl
) =>
  new ApolloClient({
    uri: isProd ? prodUrl : localUrl,
    request: requestWithAuthorization,
  });
