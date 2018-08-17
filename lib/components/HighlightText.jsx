'use strict';

const color = require('color'),
      Highlighter = require('react-highlight-words'),
      injectSheet = require('react-jss').default,
      React = require('react');

const styles = theme => ({
  HighlightText: {},

  Highlight: {
    background: color(theme.color.brand.highlight).
      whiten(0.9).
      fade(0.2).
      rgb().
      string(),
    padding: '0px 0 1px 0'
  }
});

const HighlightText = ({ classes, children, searchWords }) => {
  if (!children) {
    return null;
  }

  const patterns = searchWords.map(word => {
    const test = `(\\b${word})`;

    return test;
  });

  return (
    <Highlighter
      className={ classes.HighlightText }
      highlightClassName={ classes.Highlight }
      searchWords={ patterns }
      textToHighlight={ children }
    />
  );
};

module.exports = injectSheet(styles)(HighlightText);
