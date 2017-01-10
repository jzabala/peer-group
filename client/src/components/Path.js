import React, { PropTypes } from 'react';

const Path = ({ categories, title, description}) => (
  <div className="card" onClick={() => console.log('click')}>
    <div className="card-header text-center">
      { categories }
    </div>
    <div className="card-block">
      <h3 className="card-title">{ title }</h3>
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
