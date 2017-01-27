import React from 'react';

function handleChange(e) {
  this.setState({
    form: { ...this.state.form, [e.target.name]: e.target.value } }
  );
}

function handleSubmitError(errors) {
  this.setState({ errors, isRequest: false });
}

function resetErrorsRequest() {
  this.setState({ errors: {}, isRequest: true });
}

const withHandlers = (WrappedComponent) => {
  return (props) => <WrappedComponent
    handleChange={ handleChange }
    handleSubmitError={ handleSubmitError }
    resetErrorsRequest={ resetErrorsRequest }
    {...props }
  />
}

export default withHandlers;
