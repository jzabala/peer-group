import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import { isAuthenticated } from '../../reducers';
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
        identifier: '',
        password: '',
      },
      isSubmit: false,
      errors: {},
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
          () => this.props.goBack(),
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
    return this.props.isAuthenticated ? <Redirect to="/" /> :
    (
      <form onSubmit={ this.handleSubmit } className="LoginForm_form">
        <TextFieldGroup
          name="identifier"
          placeholder="Username or email"
          value={ this.state.form.identifier }
          onChange={ this.handleChange }
          errors={ this.state.errors.identifier }
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
          className="btn btn-primary LoginForm_submit"
          request={ this.state.isSubmit }
        >
          Submit
        </RequestButton>
      </form>
    );
  }
}

const mapStateToProps = (state, { match }) => ({
  isAuthenticated: isAuthenticated(state),
});

export default withRouter(connect(
  mapStateToProps,
  { login, addFlashMessage }
)(withHandlers(LoginForm)));
