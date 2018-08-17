'use strict';

const injectSheet = require('react-jss').default,
      React = require('react');

const styles = theme => ({
  Pattern: {
    'z-index': theme.zIndex.pattern,
    'pointer-events': 'none'
  },

  Background: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    'background-color': theme.color.brand.dark,
    'background-image': 'url("/pattern/background.png")',
    'background-repeat': 'repeat',
    'background-size': '300px 300px',
    overflow: 'hidden',
    opacity: 0.05
  },

  Mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '498px',
    'background-image': 'url("/pattern/background-overlay.png")',
    'background-repeat': 'repeat-x',
    'background-size': '1px 498px'
  }
});

const Pattern = function ({ classes }) {
  return (
    <div className={ classes.Pattern }>
      <div className={ classes.Background } />
      <div className={ classes.Mask } />
    </div>
  );
};

module.exports = injectSheet(styles)(Pattern);
