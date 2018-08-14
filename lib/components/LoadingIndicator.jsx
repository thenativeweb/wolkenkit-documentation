'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      React = require('react');

const styles = theme => ({
  '@keyframes loading-indicator-pulse': {
    '0%': {
      transform: 'scale(0)'
    },

    '100%': {
      transform: 'scale(1.0)',
      opacity: 0
    }
  },

  LoadingIndicator: {
    display: 'flex',
    'justify-content': 'flex-start',
    'align-items': 'center',
    'min-height': 100
  },

  Pulse: {
    width: 20,
    height: 20,
    'border-radius': '50%',
    'background-color': theme.color.brand.white,
    'animation-iteration-count': 'infinite',
    'animation-timing-function': 'ease-in-out',
    'animation-name': 'loading-indicator-pulse',
    'animation-duration': '800ms'
  }
});

const LoadingIndicator = function ({ classes, className }) {
  return (
    <div className={ classNames(classes.LoadingIndicator, className) }>
      <div className={ classes.Pulse } />
    </div>
  );
};

module.exports = injectSheet(styles)(LoadingIndicator);
