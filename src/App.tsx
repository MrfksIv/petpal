import React, { Suspense } from 'react';
import './App.css';
import './themes/theme-1.css';
import './index.css';
import './i18n'
import {LanguageSelector} from './components/LanguageSelector';
import LandingPage from './components/LandingPage/LandingPage';
import {useQuery} from '@apollo/client';
import gql from "graphql-tag";
import {userAccount} from './graphql/queries';
import {navigateToAuthPage} from './utils/client-utils';

function App() {
    const { loading, error, data} = useQuery(gql(userAccount));
    console.log('loading:', loading);
    if (error && error.message.indexOf('401') > 0) {
        localStorage.clear();
        navigateToAuthPage();
        console.log('error:', error.message);
    }

    let content: any;
    console.log('data:', data);
    if (loading) {
        console.log('IN LOADING!')
        content = `<h1> Loading</h1>`;
    }
    if (!loading && !data.getUserAccount) {
        content = <LandingPage />;
    }
    if (!loading && data.getUserAccount) {
        content =  <h1> Hello {data.getUserAccount.email}</h1>;
    }
    return (
        <div className="App" >
            <Suspense fallback={null}>
                {content}
                <LanguageSelector />
            </Suspense>
        </div>
    );
}

export default App;
// export default compose(
//     // @ts-ignore
//     graphql(getUserAccount, {
//         options: (props: any) => {
//             return {
//                 variables: {token: localStorage.getItem('id_token')},
//                 fetchPolicy: 'cache-and-network'
//             };
//         },
//         props: (props: {data: any}) => {
//             console.log('###PROPS:', props)
//             return {props: props}
//         }
//     })
// )(App);
