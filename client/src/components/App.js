import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Match } from 'react-router';
import PathsPage from './paths/PathsPage';
import LoginPage from './login/LoginPage';
import SignupPage from './signup/SignupPage';
import FlashMessageList from './common/FlashMessageList';
import Header from './Header';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="container App_container">
          <FlashMessageList />
          <Match exactly pattern="/" component={ PathsPage } />
          <Match pattern="/login" component={LoginPage} />
          <Match pattern="/signup" component={SignupPage} />
        </main>
      </div>
    );
  }
}

export default App;
