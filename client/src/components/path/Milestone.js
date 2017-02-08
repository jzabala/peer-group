import React, { Component, PropTypes } from 'react';
import './Milestone.css';

class Milestone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPercentageChange: false,
      fill: props.percentage,
      min: 0,
      max: 100,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.fill !== nextProps.percentage) {
      this.setState({ fill: nextProps.percentage });
    }
  }
  handleMouseDown() {
    this.setState({ isPercentageChange: true });
  }
  handleMouseUp() {
    if(this.state.isPercentageChange) {
      this.setState({ isPercentageChange: false });
      this.props.onPercentageChange({
        milestoneId: this.props.id,
        percentage: this.state.fill
      });
    }
  }
  handleChange(e) {
    this.setState({ fill: parseInt(e.target.value, 10) });
  }
  render() {
    const fill = this.state.fill;
    const styles = {
      range: {
        backgroundImage: `linear-gradient(to right, #0275d8 ${fill}%, #eceeef ${fill}%)`
      }
    };
    const { name } = this.props;
    return (
      <div>
        <div>
          <span>
            { fill }%
          </span>

          <span className="Milestone-name">
            { name }
          </span>

          <input
            className="Milestone-range"
            type="range"
            min={ this.state.min }
            max={ this.state.max }
            value={ this.state.fill }
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

Milestone.defaultValue = {
  percentage: 0,
}

export default Milestone;
