import React, { PropTypes } from 'react';
import * as utilFunc from '../../utils/functions';
import './Path.css';

const MAX_TITLE = 31;
const truncateTitle = utilFunc.truncate(MAX_TITLE);

const MAX_DESC = 51;
const truncateDesc = utilFunc.truncate(MAX_DESC);

const Path = ({ name, description }) => (
  <div className="card Path_card" onClick={() => console.log('click')}>
    {/* <div className="card-header text-center">
      { categories }
    </div> */}
    <div className="card-block Path_card-block">
      <h3 title={ name } className="card-title text-center">
        { truncateTitle(name) }
      </h3>
      <p title={ description } className="card-text">
        { description && description.trim() &&  truncateDesc(description) }
      </p>
      <a href="#" className="card-link">Go to path</a>
    </div>
</div>
);

Path.propTypes = {
  // categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
}

export default Path;
