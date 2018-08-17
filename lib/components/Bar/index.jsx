'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      merge = require('lodash/merge'),
      React = require('react');

const Action = require('./Action.jsx'),
      BackAction = require('./BackAction.jsx'),
      Left = require('./Left.jsx'),
      Right = require('./Right.jsx');

const styles = theme => ({
  Bar: {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    'align-items': 'center',
    'min-height': theme.barHeight,
    'font-size': theme.font.size.default,
    'border-bottom': '1px solid rgba(255,255,255, 0.1)',
    color: 'rgba(255, 255, 255, 0.65)',

    '& a, a:visited': {
      color: 'rgba(255, 255, 255, 0.65)',
      'text-decoration': 'none'
    },

    '& a:focus, a:hover': {
      color: theme.color.brand.highlight
    }

  }
});

const Bar = ({ children, classes, className = '', style }) => (
  <div className={ classNames(classes.Bar, className) } style={ style }>
    { children }
  </div>
);

Bar.Action = Action;
Bar.BackAction = BackAction;
Bar.Left = Left;
Bar.Right = Right;

Bar.extendStyle = function (customStyles) {
  return function (theme) {
    return merge({}, styles(theme), customStyles(theme));
  };
};

module.exports = injectSheet(styles)(Bar);
