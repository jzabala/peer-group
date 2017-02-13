import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './NewMilestone.css';

const NewMilestone = (props) => {
  const { errors } = props;
  return (
    <div className={ classnames('form-group', { 'has-danger': errors }) }>
      <div className="NewMilestone-controls">
        <input
          data-index={ props.index }
          type={ props.type }
          value={ props.value }
          placeholder={ props.placeholder }
          className={
            classnames('form-control', { 'form-control-danger': errors })
          }
        />
        <button type="button" className="close NewMilestone-controls-close" onClick={ props.onDelete }>
          <span>&times;</span>
        </button>
      </div>
      { errors && errors.map(
          (x, i) => <div key={ i } className="form-control-feedback">{ x }</div>
        )
      }
    </div>
  );
}

NewMilestone.propTypes = {
  index: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  type: PropTypes.string,
  errors: PropTypes.array,
}

NewMilestone.defaultProps = {
  type: 'text',
}

export default NewMilestone;
