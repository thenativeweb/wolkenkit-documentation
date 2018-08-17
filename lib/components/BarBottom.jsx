'use strict';

const injectSheet = require('react-jss').default,
      React = require('react');

const Bar = require('./Bar/index.jsx');

const styles = Bar.extendStyle(theme => ({
  Bar: {
    background: theme.color.brand.dark,
    'border-bottom': 0,
    'border-top': '1px solid rgba(255,255,255, 0.1)',
    'justify-content': 'center'
  }
}));

const BarBottom = ({ children, classes, className = '', style }) => (
  <Bar className={ `${classes.Bar} ${className}` } style={ style }>
    { children }
  </Bar>
);

module.exports = injectSheet(styles)(BarBottom);
