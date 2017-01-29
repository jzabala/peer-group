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
          <Match pattern="/login" component={LoginPage} />
          <Match pattern="/signup" component={SignupPage} />
          <Match pattern="/logout" component={requireAuth(Logout)} />
          <Match pattern="/new-path" component={requireAuth(NewPathPage)} />
        </main>
      </div>
    );
  }
}

export default App;
