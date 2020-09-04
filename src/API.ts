/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GetUserAccountQueryVariables = {
  token?: string | null,
};

export type GetUserAccountQuery = {
  getUserAccount:  {
    __typename: "UserAccount",
    email_verified: boolean | null,
    auth_time: number | null,
    exp: number | null,
    email: string | null,
  } | null,
};

export type GetLambdaQuery = {
  getLambda:  {
    __typename: "LambdaReturn",
    statusCode: number,
    header: string,
    body: string,
    fakefield: string | null,
  } | null,
};
