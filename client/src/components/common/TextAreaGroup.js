import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './GeneralField.css';

const TextAreaGroup = (props) => {
  const { errors } = props;
  return (
    <div className={ classnames('form-group GeneralField-form-field', { 'has-danger': errors }) }>
      <textarea
        name={ props.name }
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

TextAreaGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

export default TextAreaGroup;
