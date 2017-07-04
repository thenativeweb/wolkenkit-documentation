'use strict';

const React = require('react');

const FeedItem = function () {
  return (
    <section className='wk-feed__item'>
      <p>
        Couldn&apos;t load the latest news!
        But there&apos;s more, <a title='Follow us on twitter' href='https://twitter.com/thenativeweb'>follow us on Twitter</a> or <a title='Visit the official website' href='https://www.wolkenkit.io/'>visit wolkenkit.io</a> to stay up to date.
      </p>
    </section>
  );
};

module.exports = FeedItem;
