'use strict';

const React = require('react');

const Icon = function (props) {
  const { size, name } = props;

  return (
    <svg xmlns='http://www.w3.org/2000/svg' className={ `wk-icon wk-icon-${name} wk-icon--${size}` }>
      <use xlinkHref={ `#icon-${name}` } />
    </svg>
  );
};

Icon.defaultProps = {
  size: 'medium'
};

module.exports = Icon;
