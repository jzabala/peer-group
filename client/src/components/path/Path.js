import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as utilFunc from '../../utils/functions';
import './Path.css';

const MAX_TITLE = 31;
const truncateTitle = utilFunc.truncate(MAX_TITLE);

const MAX_DESC = 51;
const truncateDesc = utilFunc.truncate(MAX_DESC);

const Path = ({ name, description, id }) => (
  <div className="card Path_card">
    <div className="card-block Path_card-block">
      <h3 title={ name } className="card-title text-center">
        { truncateTitle(name) }
      </h3>
      <p title={ description } className="card-text">
        { description && description.trim() &&  truncateDesc(description) }
      </p>
      <Link to={ `/paths/${id}` } className="card-link">Go to path</Link>
    </div>
</div>
);

Path.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
}

export default Path;
