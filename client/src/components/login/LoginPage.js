import React from 'react';
import LoginForm from './LoginForm';
import './LoginPage.css';

const LoginPage = (props) => (
  <section className="container LoginPage_container text-center">
    <h4>Login</h4>
    <LoginForm />
  </section>
);

export default LoginPage;
