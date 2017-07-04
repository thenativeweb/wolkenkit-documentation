'use strict';

const React = require('react');

const LoadingIndicator = function () {
  return (
    <div className='wk-loading-indicator'>
      <div className='wk-loading-indicator__pulse' />
    </div>
  );
};

module.exports = LoadingIndicator;
