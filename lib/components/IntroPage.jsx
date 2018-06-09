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

  /* eslint-disable no-process-env */
  const newsUrl = process.env.NEWS_URL || 'https://docs.wolkenkit.io/news.json';
  /* eslint-enable no-process-env */

  return (
    <div className={ introClasses }>
      <Brand suffix={ 'Documentation' } isCollapsed={ isCollapsed } />
      <Feed url={ newsUrl } />
    </div>
  );
};

module.exports = IntroPage;
