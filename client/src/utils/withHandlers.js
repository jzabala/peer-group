import React from 'react';

function handleChange(e) {
  this.setState({
    form: { ...this.state.form, [e.target.name]: e.target.value } }
  );
}

function handleSubmitError(errors) {
  this.setState({ errors, isSubmit: false });
}

function resetErrorsRequest() {
  this.setState({ errors: {}, isSubmit: true });
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
