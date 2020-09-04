import React, { Component, Suspense } from 'react';
import './App.css';
import {LoginForm} from './components/authentication/login/Login';
import {Redirect, Route, Switch} from 'react-router-dom';
import {RegisterForm} from './components/authentication/register/Register';
import './i18n'
import {LanguageSelector} from './components/LanguageSelector';
import { UserAccount } from './components/UserAccount';

class App extends Component {
  render() {
      return (
          // @ts-ignore
          <div className="App">
            <Suspense fallback={null}>
                <UserAccount />
                <Switch>
                    <Route exact path='/' component={LoginForm}>
                        <Redirect to='/login'/>
                    </Route>
                    <Route path='/login' component={LoginForm}/>
                    <Route path='/register' component={RegisterForm}/>
                    {/*<Route path='/forgot-password' component={RegisterForm}/>*/}
                </Switch>
                <LanguageSelector></LanguageSelector>
            </Suspense>
          </div>

    );
  }
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
