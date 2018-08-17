'use strict';

const format = require('date-fns/format'),
      injectSheet = require('react-jss').default,
      React = require('react');

const Markdown = require('./Markdown.jsx');

const styles = theme => ({
  FeedItem: {
    padding: '20px 0 22px 0',
    margin: 0,
    'border-bottom': '1px solid rgba(255,255,255, 0.1)',
    width: '37.5vw',

    '& p': {
      padding: [ 0, theme.grid.stepSize * 3 ],
      color: 'rgba(255, 255, 255, 0.8)'
    }
  },

  Title: {
    display: 'flex',
    'font-family': theme.font.family.default,
    'font-size': theme.font.size.default,
    color: theme.color.brand.white,
    'font-weight': 600,
    padding: [ 0, theme.grid.stepSize * 3 ]
  },

  Date: {
    color: '#BDBDC1',
    'font-weight': 400,
    'padding-right': theme.grid.stepSize * 3
  },

  [theme.device.small]: {
    FeedItem: {
      padding: 0,
      margin: [ theme.grid.stepSize / 2, 0 ],
      width: '100vw',

      '& p': {
        margin: [ 0, theme.grid.stepSize * 1.5 ],
        padding: [ theme.grid.stepSize * 1.5, 0 ]
      }
    },

    Title: {
      padding: [ theme.grid.stepSize * 1.5, theme.grid.stepSize * 1.5, 0, theme.grid.stepSize * 1.5 ],
      margin: 0
    }
  }
});

const FeedItem = function ({ classes, item = {}, isMarkdown = true }) {
  let publishedAt;

  if (item.date) {
    publishedAt = new Date(item.date.year, item.date.month - 1, item.date.day);
  }

  return (
    <section className={ classes.FeedItem }>
      <h2 className={ classes.Title }>
        { publishedAt ? <span className={ classes.Date }>{format(publishedAt, 'DD.MM.YYYY')}</span> : null }
        { item.title }
      </h2>
      { isMarkdown ? <Markdown content={ item.content } /> : item.content }
    </section>
  );
};

module.exports = injectSheet(styles)(FeedItem);
