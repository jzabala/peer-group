import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import TextFieldGroup from '../common/TextFieldGroup';
import RequestButton from '../common/RequestButton';
import { signup } from '../../actions/users';
import { addFlashMessage } from '../../actions/flashMessages';
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
        country: '',
        city: '',
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

    const submitError = errors => this.setState({ errors, isSignup: false });
    const validation = validateSignup(this.state.form);
    validation.then(
      (data) => {
        var request = signup(data);
        request.then(
          () => {
            this.setState({ redirect: true });
            this.props.addFlashMessage({
              type: "success",
              strong: "Successful Signup!",
              text: "You can login now.",
              duration: 5000,
              timeout: false,
            });
          },
          (err) => submitError(err.response.data.errors)
        )
      },
      (errors) => submitError(errors),
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
            <TextFieldGroup
              name="country"
              placeholder="Enter country"
              onChange={ this.handleChange }
              errors={ this.state.errors.country }
              value={ this.state.form.country }
            />
            <TextFieldGroup
              name="city"
              placeholder="Enter city"
              type="text"
              onChange={ this.handleChange }
              errors={ this.state.errors.city }
              value={ this.state.form.city }
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

export default connect(null, { addFlashMessage })(SignupForm);
