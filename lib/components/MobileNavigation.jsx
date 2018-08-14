'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      React = require('react'),
      { Icon } = require('thenativeweb-ux');

const styles = theme => ({
  MobileNavigation: {
    position: 'fixed',
    'z-index': theme.zIndex.content,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    'pointer-events': 'none'
  },

  Backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    visibility: 'hidden',
    'pointer-events': 'none'
  },

  Toggle: {
    background: theme.color.brand.dark,
    position: 'absolute',
    top: 5,
    left: 5,
    'border-radius': '50%',
    display: 'none',
    'align-items': 'center',
    'justify-content': 'center',
    width: 36,
    height: 36,
    'will-change': 'opacity'
  },

  NavIcon: {
    fill: theme.color.brand.white
  },

  [theme.device.small]: {
    Toggle: {
      display: 'flex',
      'pointer-events': 'auto'
    },

    Backdrop: {},

    IsVisible: {
      '& $Backdrop': {
        visibility: 'visible',
        'pointer-events': 'auto'
      }
    }
  }
});

const MobileNavigation = function ({ classes, isVisible, onClick }) {
  return (
    <div className={ classNames(classes.MobileNavigation, { [classes.IsVisible]: isVisible }) }>
      <div onClick={ onClick } className={ classes.Backdrop } />
      <div onClick={ onClick } className={ classes.Toggle }>
        <Icon className={ classes.NavIcon } name='nav' size='m' />
      </div>
    </div>

  );
};

module.exports = injectSheet(styles)(MobileNavigation);
