'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      React = require('react');

const styles = theme => ({
  Right: {
    'margin-right': theme.grid.stepSize * 1.5
  }
});

const Right = ({ children, classes, className = '', style }) => (
  <div className={ classNames(classes.Right, className) } style={ style }>
    { children }
  </div>
);

module.exports = injectSheet(styles)(Right);
