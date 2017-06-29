import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
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
    const { name, showProgress } = this.props;
    const { fill, max } = this.state;
    const done = fill === max;
    const styles = {
      range: {
        backgroundImage: `linear-gradient(to right, #0275d8 ${fill}%, #eceeef ${fill}%)`
      }
    };
    return (
      <div className={ classnames({ 'Milestone-done-color': done }) }
      >
      <div className="Milestone-box">
        <div className="Milistone-box-name">
          <p className="Milestone-name">
            { name }
           </p>
        </div>
     </div>
        {
          showProgress && <span>{ fill }%</span>
        }
        { done && <i className="icon-ok-1"></i> }
        {
          showProgress && <input
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
        }
      </div>
    );
  }
}

Milestone.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  showProgress: PropTypes.bool.isRequired,
  onPercentageChange: PropTypes.func.isRequired,
};

Milestone.defaultValue = {
  percentage: 0,
}

export default Milestone;
