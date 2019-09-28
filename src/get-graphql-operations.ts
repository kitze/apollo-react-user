import { gql } from 'apollo-boost';

export const UserFieldsFragment = gql`
  fragment UserFields on User {
    id
    email
  }
`;

export const getGraphqlOperations = (
  userFragment: any = UserFieldsFragment
) => ({
  queries: {
    me: gql`
      query Me {
        me {
          ...UserFields
        }
      }
      ${userFragment}
    `,
  },
  mutations: {
    register: gql`
      mutation Register($user: UserInput!) {
        register(user: $user) {
          token
          user {
            ...UserFields
          }
        }
      }
      ${userFragment}
    `,
    login: gql`
      mutation Login($email: String, $password: String) {
        login(email: $email, password: $password) {
          token
          user {
            ...UserFields
          }
        }
      }
      ${userFragment}
    `,
  },
});
