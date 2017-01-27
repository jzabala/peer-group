import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flashMessages';
import TextFieldGroup from '../common/TextFieldGroup';
import RequestButton from '../common/RequestButton';
import withHandlers from '../../utils/withHandlers';
import { validateLogin } from '../../validators/authValidator';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: '',
        password: '',
      },
      isRequest: false,
      errors: {},
      redirectTo: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = props.handleChange.bind(this);
    this.handleSubmitError = props.handleSubmitError.bind(this);
    this.resetErrorsRequest = props.resetErrorsRequest.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.resetErrorsRequest();

    validateLogin(this.state.form).then(
      data => {
        this.props.login(data).then(
          () => this.setState({ redirectTo: '/' }),
          errors => {
            this.handleSubmitError(errors);
            if(errors.general) {
              this.props.addFlashMessage({
                type: "danger",
                strong: "Error!",
                text: errors.general,
                duration: 5000,
                timeout: false,
              });
            }
          },
        );
      },
      errors => this.handleSubmitError(errors),
    );
  }
  render() {
    return (
      <div>
        { this.state.redirectTo ? <Redirect to={ this.state.redirectTo } /> :
          <form onSubmit={ this.handleSubmit } className="LoginForm_form">
            <TextFieldGroup
              name="email"
              placeholder="Enter email"
              value={ this.state.form.email }
              onChange={ this.handleChange }
              errors={ this.state.errors.email }
            />

            <TextFieldGroup
              name="password"
              type="password"
              placeholder="Password"
              onChange={ this.handleChange }
              value={ this.state.form.password }
              errors={ this.state.errors.password }
            />
            <RequestButton
              type="submit"
              className="btn btn-primary LoginForm_submit"
              request={ this.state.isRequest }
            >
              Submit
            </RequestButton>
          </form>
        }
      </div>
    );
  }
}

export default connect(
  null,
  { login, addFlashMessage }
)(withHandlers(LoginForm));
