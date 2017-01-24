import React from 'react';
import './SignupForm.css';

const SignupForm = (props) => (
  <form className="SignupForm_form">
    <div className="form-group SignupForm_form-group">
      <input type="email" className="form-control"
        placeholder="Enter email" />
    </div>
    <div className="form-group SignupForm_form-group">
      <input type="password" className="form-control"
        placeholder="Password" />
    </div>
    <div className="form-group SignupForm_form-group">
      <input type="password" className="form-control"
        placeholder="Confirm Password" />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
);

export default SignupForm;
