'use strict';

const Icon = require('./Icon.jsx');

const React = require('react');

const Left = ({ children, className = '', style }) => (
  <div className={ `wk-bar__left ${className}` } style={ style }>
    { children }
  </div>
);

const Right = ({ children, className = '', style }) => (
  <div className={ `wk-bar__right ${className}` } style={ style }>
    { children }
  </div>
);

const Action = ({ children, className = '', icon, style, onClick }) => (
  <div className={ `wk-bar__action ${className}` } style={ style }>
    <a
      onClick={ event => {
        event.stopPropagation();
        event.preventDefault();
        onClick(event);
      } } href='#'
    >
      <Icon name={ icon } />
      <span className='label'>{ children }</span>
    </a>
  </div>
);

const BackAction = ({ children, className = '', onClick }) => (
  <Action
    className={ `wk-bar__back-action ${className}` }
    icon='back'
    onClick={ onClick }
  >
    { children }
  </Action>
);

const Bar = ({ children, className = '', style }) => (
  <div className={ `wk-bar ${className}` } style={ style }>
    { children }
  </div>
);

Bar.Action = Action;
Bar.BackAction = BackAction;
Bar.Left = Left;
Bar.Right = Right;

module.exports = Bar;
