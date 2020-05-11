import React, { Component, Suspense } from 'react';
import './App.css';
import {LoginForm} from './components/authentication/login/Login';
import {Redirect, Route, Switch} from 'react-router-dom';
import {RegisterForm} from './components/authentication/register/Register';
import './i18n'
import {LanguageSelector} from './components/LanguageSelector';

class App extends Component {
  render() {
    // fake commit
    return (
      <div className="App">
        <Suspense fallback={null}>
            <Switch>
                <Route exact path='/' component={LoginForm}>
                    <Redirect to='/login'/>
                </Route>
                <Route path='/login' component={LoginForm}/>
                <Route path='/register' component={RegisterForm}/>
                <Route path='/forgot-password' component={RegisterForm}/>
            </Switch>
            <LanguageSelector></LanguageSelector>
        </Suspense>
      </div>
    );
  }
}

export default App;
