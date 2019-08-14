import React, { Component } from 'react';
import './App.css';
import {LoginForm} from './components/authentication/login/Login';
import {Redirect, Route, Switch} from 'react-router-dom';
import {RegisterForm} from './components/authentication/register/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route exact path='/' component={LoginForm}>
                <Redirect to='/login'/>
            </Route>
            <Route path='/login' component={LoginForm}/>
            <Route path='/register' component={RegisterForm}/>
            <Route path='/forgot-password' component={RegisterForm}/>
        </Switch>
      </div>
    );
  }
}

export default App;
