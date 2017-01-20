import React, { Component } from 'react';
import { Match } from 'react-router';
import PathsPage from './PathsPage';
import SignupPage from './SignupPage';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Match exactly pattern="/" component={ PathsPage } />
        <Match pattern="/signup" component={SignupPage} />
      </div>
    );
  }
}

export default App;
