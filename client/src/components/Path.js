import React, { PropTypes } from 'react';
import * as utilFunc from '../utils/functions';
import './Path.css';

const REMOVE_TITLE_CHARACTERS = 26;
const MAX_TITLE_CHARACTERS = 29;
const truncateTitle = utilFunc.truncate([REMOVE_TITLE_CHARACTERS, MAX_TITLE_CHARACTERS]);

const Path = ({ categories, title, description}) => (
  <div className="card Path_card" onClick={() => console.log('click')}>
    <div className="card-header text-center">
      { categories }
    </div>
    <div className="card-block">
      <h3 className="card-title">{ truncateTitle(title) }</h3>
      <p className="card-text">{ description }</p>
      <a href="#" className="card-link">Go to path</a>
    </div>
</div>
);

Path.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Path;
