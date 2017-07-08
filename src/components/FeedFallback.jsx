'use strict';

const React = require('react');

const FeedItem = function () {
  return (
    <section className='wk-feed__item'>
      <h2 className='wk-feed__item__title'>Failed to load the latest news 😢</h2>
      <p>
        Unfortunately, there went something wrong while loading the news.
        Please <a href='mailto:hello@thenativeweb.io'>contact us</a> if this
        problem persists.
      </p>
      <p>
        Meanwhile, you may <a href='https://twitter.com/thenativeweb'>follow us
        on Twitter</a> or visit the <a href='https://www.wolkenkit.io/'>wolkenkit
        website</a>.
      </p>
    </section>
  );
};

module.exports = FeedItem;
