'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      React = require('react'),
      { Icon } = require('thenativeweb-ux');

const Action = require('./Action.jsx');

const styles = theme => ({
  BackAction: {
    flex: '1 1 100%',
    'padding-left': theme.grid.stepSize / 2,
    'padding-right': theme.grid.stepSize / 2
  },

  Icon: {
    'margin-left': theme.grid.stepSize / 2,
    'margin-right': theme.grid.stepSize / 2,
    transform: 'rotate(180deg)',
    'transform-origin': '50% 50%',
    fill: 'currentColor'
  }
});

const BackAction = ({ children, classes, className = '', style, onClick }) => (
  <Action
    className={ classNames(classes.BackAction, className) }
    icon={ <Icon className={ classes.Icon } name='chevron' size='s' /> }
    style={ style }
    onClick={ onClick }
  >
    { children }
  </Action>
);

module.exports = injectSheet(styles)(BackAction);
