'use strict';

const React = require('react');

const Icon = require('./Icon.jsx');

const renderItems = function (items) {
  if (!Array.isArray(items)) {
    return null;
  }

  return items.map(breadcrumb =>
    <span className='wk-breadcrumbs__item' key={ breadcrumb }>
      <Icon name='breadcrumb-separator' />
      <span>{ breadcrumb }</span>
    </span>
  );
};

const Breadcrumbs = function (props) {
  return (
    <div className='wk-breadcrumbs'>
      <span>Documentation</span>
      { renderItems(props.breadcrumbs) }
    </div>
  );
};

module.exports = Breadcrumbs;
