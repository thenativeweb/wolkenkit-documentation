'use strict';

const React = require('react');

const Icon = require('./Icon.jsx');

const MobileNavigation = function ({ onClick }) {
  return (
    <div className='wk-mobile-navigation'>
      <div onClick={ onClick } className='wk-mobile-navigation__backdrop' />
      <div onClick={ onClick } className='wk-mobile-navigation__toggle'>
        <Icon name='nav' />
      </div>
    </div>

  );
};

module.exports = MobileNavigation;
