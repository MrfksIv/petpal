import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/client';
import {navigateToAuthPage} from './utils/client-utils';
import client from './graphql/apollo';

(() => {

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



const WithProvider = () => (
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>

);

ReactDOM.render(

    <WithProvider />,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// THEME COLORS: https://www.materialpalette.com/deep-orange/lime
serviceWorker.unregister();
