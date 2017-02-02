import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import TextFieldGroup from '../common/TextFieldGroup';
import RequestButton from '../common/RequestButton';
import { signup } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flashMessages';
import { validateSignup } from '../../validators/authValidator';
import withHandlers from '../../utils/withHandlers';
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
      isSubmit: false,
      redirectTo: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = props.handleChange.bind(this);
    this.handleSubmitError = props.handleSubmitError.bind(this);
    this.resetErrorsRequest = props.resetErrorsRequest.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.resetErrorsRequest();

    const validation = validateSignup(this.state.form);
    validation.then(
      (data) => {
        signup(data).then(
          () => {
            this.setState({ redirectTo: '/login' });
            this.props.addFlashMessage({
              type: "success",
              strong: "Successful Signup!",
              text: "You can login now.",
              duration: 5000,
              timeout: false,
            });
          },
          this.handleSubmitError,
        )
      },
      this.handleSubmitError,
    );
  }
  render() {
    return (
      this.state.redirectTo ? <Redirect to={ this.state.redirectTo } /> :
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
            className="btn btn-primary SignupForm_submit"
            request={ this.state.isSubmit }
          >
            Submit
          </RequestButton>
        </form>
    );
  }
}

export default connect(
  null,
  { addFlashMessage }
)(withHandlers(SignupForm));
