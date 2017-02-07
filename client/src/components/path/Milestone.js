import React, { Component, PropTypes } from 'react';
import './Milestone.css';

class Milestone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPercentageChangeEnd: false,
      fill: 0,
      min: 0,
      max: 100,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleMouseDown() {
    this.setState({ isPercentageChangeEnd: true });
    console.log('Init change');
  }
  handleMouseUp() {
    if(this.state.isPercentageChangeEnd) {
      this.setState({ isPercentageChangeEnd: false });
      console.log('End change');
    }
  }
  handleChange(e) {
    const { min, max } = this.state;
    const fill = ((e.target.value - min) / (max - min));
    this.setState({ fill });
  }
  render() {
    const fill = this.state.fill;
    const styles = {
      range: {
        backgroundImage: `linear-gradient(to right, #0275d8 calc(${fill} * 100%), #eceeef calc(${fill} * 100%))`
      }
    };
    const { id, name, percentage, onPercentageChange } = this.props;
    return (
      <div>
        <div>
          <span>
            { parseInt(fill * 100) }%
          </span>

          <span className="Milestone-name">
            { name }
          </span>

          <input
            className="Milestone-range"
            type="range"
            min={ this.state.min }
            max={ this.state.max }
            defaultValue={0}
            onMouseDown={ this.handleMouseDown }
            onMouseUp={ this.handleMouseUp }
            onChange={ this.handleChange }
            style={ styles.range }
          />
          <hr />
        </div>
      </div>
    );
  }
}

Milestone.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  onPercentageChange: PropTypes.func.isRequired,
};

export default Milestone;
