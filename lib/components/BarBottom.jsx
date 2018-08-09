'use strict';

const React = require('react');

const Bar = require('./Bar.jsx');

const BarBottom = ({ children, className = '', style }) => (
  <Bar className={ `wk-bar--bottom ${className}` } style={ style }>
    { children }
  </Bar>
);

module.exports = BarBottom;
