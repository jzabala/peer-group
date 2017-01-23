import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Match } from 'react-router';
import PathsPage from './PathsPage';
import SignupPage from './SignupPage';
import Header from './Header';
import RequestOverlay from './RequestOverlay';


class App extends Component {
  render() {
    return (
      <div>
        <RequestOverlay />
        <Header />
        <Match exactly pattern="/" component={ PathsPage } />
        <Match pattern="/login" component={SignupPage} />
      </div>
    );
  }
}

export default App;
