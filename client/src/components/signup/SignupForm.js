import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import TextFieldGroup from '../commons/TextFieldGroup';
import RequestButton from '../commons/RequestButton';
import { signup } from '../../actions/users';
import { validateSignup } from '../../validations/users';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      errors: {},
      isSignup: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value } }
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({ isSignup: true });

    const validation = validateSignup(this.state.form);
    const request = validation.then(
      (data) => this.props.signup(data),
      (errors) => Promise.reject({ data: errors }),
    );
    request.then(
      () => this.setState({ redirect: true }),
      (err) => console.log(err) /*this.setState({ errors: err.data/*, isSignup: false })*/,
    );
  }
  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to="/login" /> :
          <form onSubmit={ this.handleSubmit } className="SignupForm_form">
            <TextFieldGroup
              name="email"
              placeholder="Enter email"
              value={ this.state.form.email }
              errors={ this.state.errors.email }
              onChange={ this.handleChange }
            />
            <TextFieldGroup
              name="password"
              type="password"
              placeholder="Password"
              onChange={ this.handleChange }
              errors={ this.state.errors.password }
              value={ this.state.form.password }
            />
            <TextFieldGroup
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={ this.handleChange }
              errors={ this.state.errors.confirmPassword }
              value={ this.state.form.confirmPassword }
            />

            <RequestButton
              type="submit"
              className="btn btn-primary SignupForm_submit"
              request={ this.state.isSignup }
            >
              Submit
            </RequestButton>
          </form>
        }
      </div>
    );
  }
}

export default connect(null, { signup })(SignupForm);
