'use strict';

const React = require('react');

const Brand = require('./Brand.jsx'),
      Feed = require('./Feed.jsx');

const IntroPage = function (props) {
  const { isCollapsed } = props;
  let introClasses = 'wk-intro-page';

  if (isCollapsed) {
    introClasses += ' wk-intro-page--collapsed';
  }

  return (
    <div className={ introClasses }>
      <Brand suffix={ 'Documentation' } isCollapsed={ isCollapsed } />
      <Feed />
    </div>
  );
};

module.exports = IntroPage;
