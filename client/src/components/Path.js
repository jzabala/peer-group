import React, { PropTypes } from 'react';
import R from 'ramda';
import * as utilFunc from '../utils/functions';

const TITLE_CHARACTERS = 26;
const MAX_TITLE_CHARACTERS = 29;

const formatTitle = R.compose(
  utilFunc.addDots(TITLE_CHARACTERS),
  utilFunc.greateSubstringStart(TITLE_CHARACTERS, MAX_TITLE_CHARACTERS)
);

const Path = ({ categories, title, description}) => (
  <div className="card" onClick={() => console.log('click')}>
    <div className="card-header text-center">
      { categories }
    </div>
    <div className="card-block">
      <h3 className="card-title">{ formatTitle(title) }</h3>
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
