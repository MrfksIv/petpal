import { AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
// import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { Amplify } from 'aws-amplify';

const url = process.env.REACT_APP_APPSYNC_ENDPOINT!;
const region = 'eu-west-1';
const auth: AuthOptions = {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: () => localStorage.getItem('id_token') as string ,

};
const httpLink = new HttpLink({ uri: url });

const cache = new InMemoryCache();

const link = ApolloLink.from([
    createAuthLink({ url, region, auth}) as unknown as ApolloLink,
    // createSubscriptionHandshakeLink(url, httpLink),
    httpLink,
]);

const client = new ApolloClient<NormalizedCacheObject>({
    link,
    cache
});

Amplify.configure({
    region: process.env.REACT_APP_USER_POOL_REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
})

// client.query({
//     query: gql(getUserAccount),
//     variables: {token: localStorage.getItem('id_token')}
// }).then( (data) => {
//     console.log('Test:', data);
// }).catch(err => console.log('ERROR:', err))

export default client;
