'use strict';

const format = require('date-fns/format'),
      React = require('react');

const Markdown = require('./Markdown.jsx');

const FeedItem = function ({ item = {}}) {
  if (!item.date || !item.title || !item.content) {
    return null;
  }

  const publishedAt = new Date(item.date.year, item.date.month - 1, item.date.day);

  return (
    <section className='wk-feed__item'>
      <h2 className='wk-feed__item__title'><span className='wk-feed__item__date'>{format(publishedAt, 'DD.MM.YYYY')}</span>{item.title}</h2>
      <Markdown content={ item.content } />
    </section>
  );
};

module.exports = FeedItem;
