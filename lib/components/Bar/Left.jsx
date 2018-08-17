'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      React = require('react');

const styles = theme => ({
  Left: {
    'margin-left': theme.grid.stepSize * 1.5
  }
});

const Left = ({ children, classes, className = '', style }) => (
  <div className={ classNames(classes.Left, className) } style={ style }>
    { children }
  </div>
);

module.exports = injectSheet(styles)(Left);
