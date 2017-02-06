import React, { PropTypes } from 'react';
import Auth from '../auth/Auth';
import './Milestone.css';

const Milestone = ({ id, name, status, onStatusChange }) => {
  return (
    <div>
      <div>
        <Auth render={
          ({ isAuth }) => (isAuth ?
            <select value={ status } className="custom-select" onChange={
              (e) => onStatusChange({
                status: e.target.value,
                milestoneId: id,
              })
            }>
              <option value="">Unstarted</option>
              <option value="stated">Started</option>
              <option value="finished">Finished</option>
            </select> : null
          )
        }/>

        <span className="Milestone-name">
          { name }
        </span>
        <hr />
      </div>
    </div>
  )
}

Milestone.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Milestone;
