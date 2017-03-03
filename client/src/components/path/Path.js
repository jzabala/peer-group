import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as utilFunc from '../../utils/functions';
import './Path.css';

const MAX_TITLE = 31;
const truncateTitle = utilFunc.truncate(MAX_TITLE);

const MAX_DESC = 51;
const truncateDesc = utilFunc.truncate(MAX_DESC);

const Path = ({ name, description, url }) => (
  <div className="row Path_card">
      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 Path_card-block">
        <h3 title={ name } className="">
         <Link to={ `/paths/${url}` }>
            { truncateTitle(name) }
          </Link>
        </h3>
      </div>
    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
      <p className="Path_detail-paragraph">{ description && description.trim() &&  truncateDesc(description) }</p>
      <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: 60+'%'}}>
         60%
        </div>
      </div>
    </div>
</div>
);

Path.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
}

export default Path;
