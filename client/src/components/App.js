import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PathPage from './path/PathPage';
import LoginPage from './auth/LoginPage';
import SignupPage from './auth/SignupPage';
import Logout from './auth/Logout';
import NewPathPage from './path/NewPathPage';
import FlashMessageList from './common/FlashMessageList';
import Header from './Header';
import Auth from './auth/Auth'
import './App.css';


class App extends Component {
  render() {
    const homeRedirect = <Redirect to="/" />;
    return (
      <div>
        <Header />
        <main className="container App_container">
          <FlashMessageList />
          <Route exact path="/" component={ PathPage } />
          <Route path="/login" render={
            () => <Auth render={
              ({ isAuth }) => !isAuth ? <LoginPage /> : homeRedirect
            }/>
          }/>
          <Route path="/signup" render={
            () => <Auth render={
              ({ isAuth }) => !isAuth ? <SignupPage /> : homeRedirect
            }/>
          }/>
          <Route path="/new-path" render={
            () => <Auth render={
              ({ isAuth }) => isAuth ? <NewPathPage /> : <Redirect to="/login" />
            }/>
          }/>
          <Route path="/logout" render={
            () => <Auth render={
              ({ isAuth }) => isAuth ? <Logout /> : homeRedirect
            }/>
          }/>
        </main>
      </div>
    );
  }
}

export default App;
