'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      React = require('react'),
      { Icon } = require('thenativeweb-ux');

const styles = theme => ({
  Action: {
    display: 'flex',
    'margin-right': theme.grid.stepSize * 1.5,

    '& a': {
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'center',
      color: 'rgba(255, 255, 255, 0.65)'
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  Icon: {
    flex: '0 0 auto',
    fill: 'currentColor'
  }
});

const Action = ({ children, classes, className = '', icon, style, onClick }) => (
  <div className={ classNames(classes.Action, className) } style={ style }>
    <a
      onClick={ event => {
        event.stopPropagation();
        event.preventDefault();
        onClick(event);
      } } href='#'
    >
      {
        typeof icon === 'string' ?
          <Icon className={ classes.Icon } name={ icon } size='s' /> :
          icon
      }
      <span className='label'>{ children }</span>
    </a>
  </div>
);

module.exports = injectSheet(styles)(Action);
