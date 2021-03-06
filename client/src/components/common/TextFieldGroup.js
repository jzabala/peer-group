import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './GeneralField.css';

const TextFieldGroup = (props) => {
  const { errors } = props;
  return (
    <div className={ classnames('form-group GeneralField-form-field', { 'has-danger': errors }) }>
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

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

TextFieldGroup.defaultProps = {
  type: 'text',
}

export default TextFieldGroup;
