/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserAccount = /* GraphQL */ `
  query GetUserAccount($token: String) {
    getUserAccount(token: $token) {
      email_verified
      auth_time
      exp
      email
    }
  }
`;
export const getLambda = /* GraphQL */ `
  query GetLambda {
    getLambda {
      statusCode
      header
      body
      fakefield
    }
  }
`;
