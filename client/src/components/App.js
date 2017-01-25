import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Match } from 'react-router';
import PathsPage from './paths/PathsPage';
import LoginPage from './login/LoginPage';
import SignupPage from './signup/SignupPage';
import Header from './Header';
import RequestOverlay from './RequestOverlay';
import './App.css';


class App extends Component {
  render() {
    return (
      <main className="App_container">
        <RequestOverlay />
        <Header />
        <Match exactly pattern="/" component={ PathsPage } />
        <Match pattern="/login" component={LoginPage} />
        <Match pattern="/signup" component={SignupPage} />
      </main>
    );
  }
}

export default App;
