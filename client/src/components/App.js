import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Match } from 'react-router';
import PathPage from './path/PathPage';
import LoginPage from './auth/LoginPage';
import SignupPage from './auth/SignupPage';
import Logout from './auth/Logout';
import NewPathPage from './path/NewPathPage';
import FlashMessageList from './common/FlashMessageList';
import Header from './Header';
import AuthRedirect from './AuthRedirect';
import requireAuth from '../utils/requireAuth.js'
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="container App_container">
          <FlashMessageList />
          <Match exactly pattern="/" component={ PathPage } />
          <AuthRedirect onAuthenticate={ true } to="/">
            <Match pattern="/login" component={LoginPage} />
          </AuthRedirect>
          <AuthRedirect onAuthenticate={ true } to="/">
            <Match pattern="/signup" component={SignupPage} />
          </AuthRedirect>
          <AuthRedirect onUnauthenticate={ true } to="/">
            <Match pattern="/logout" component={requireAuth(Logout)} />
          </AuthRedirect>
          <AuthRedirect onUnauthenticate={ true } to="/">
            <Match pattern="/new-path" component={requireAuth(NewPathPage)} />
          </AuthRedirect>
        </main>
      </div>
    );
  }
}

export default App;
