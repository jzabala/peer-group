import React from 'react';
import './LoginForm.css';

const LoginForm = (props) => (
  <form className="LoginForm_form">
    <div className="form-group LoginForm_form-group">
      <input type="email" className="form-control"
        placeholder="Enter email" />
    </div>
    <div className="form-group LoginForm_form-group">
      <input type="password" className="form-control"
        placeholder="Password" />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
);

export default LoginForm;
