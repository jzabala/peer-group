import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './TextFieldGroup.css';

const TextField = (props) => {
  const { errors } = props;
  return (
    <div className={ classnames('form-group TextFieldGroup_form-group', { 'has-danger': errors }) }>
      <input
        name={ props.name }
        type={ props.type }
        placeholder={ props.placeholder }
        value={ props.value }
        onChange={ props.onChange }
        className={ classnames('form-control', { 'form-control-danger': errors }) }
      />
      { errors && errors.map(
          (x, i) => <div key={ i } className="form-control-feedback">{ x }</div>
        )
      }
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

TextField.defaultProps = {
  type: 'text',
}

export default TextField;
