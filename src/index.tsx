import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Amplify } from 'aws-amplify';
import { ApolloProvider } from '@apollo/react-hooks';
import { getUserAccount } from './graphql/queries';
import { ApolloLink } from 'apollo-link';
import { AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient} from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

(() => {
    const AUTH_URL = process.env.REACT_APP_AUTH_ENDPOINT!;
    function navigateToAuthPage() {
        window.location.assign(AUTH_URL);
    }

    function saveToLocalStorage(arrParams: string[]) {
        const objArr = arrParams.map((param: string) => {
            const [key, val] = param.split('=');
            return  {[key]: val};
        });

        const paramsObj = Object.assign({}, ...objArr);
        Object.entries(paramsObj).forEach(keyVal => {
            const [key, val] = keyVal;
            localStorage.setItem(key, val as string);
        });
    }

    const keepParams = document.URL.substring(document.URL.indexOf('#')+1, document.URL.length);
    const arrParams  = keepParams.split('&');

    // if no token exists in localStorage AND no token exists in the url
    // it means that the user navigated to the website directly while being unauthenticated from cognito
    if (!localStorage.getItem('access_token') && arrParams.length === 1) {
        return navigateToAuthPage();
    }
    // reached the site from the authentication page and url contains token parameters. Save them.
    if (arrParams.length > 1) {
        saveToLocalStorage(arrParams);
    }
})();




const url = process.env.REACT_APP_APPSYNC_ENDPOINT!;
const region = 'eu-west-1';
const auth: AuthOptions = {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: () => localStorage.getItem('id_token') as string ,

};
const httpLink = createHttpLink({ uri: url });
const link = ApolloLink.from([
    createAuthLink({ url, region, auth}),
    httpLink,
    createSubscriptionHandshakeLink(url, httpLink)
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

Amplify.configure({
    region: process.env.REACT_APP_USER_POOL_REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
})

client.query({
    query: gql(getUserAccount),
    variables: {token: localStorage.getItem('id_token')}
}).then( (data) => {
    console.log('Test:', data);
}).catch(err => console.log('ERROR:', err))

const WithProvider = () => (
    // @ts-ignore
    <ApolloProvider client={client}>
            <App />
    </ApolloProvider>

);

ReactDOM.render(
    <Router>
        <WithProvider />
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// THEME COLORS: https://www.materialpalette.com/deep-orange/lime
serviceWorker.unregister();
