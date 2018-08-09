'use strict';

const Highlighter = require('react-highlight-words'),
      React = require('react');

const HighlightText = ({ children, searchWords }) => {
  if (!children) {
    return null;
  }

  const patterns = searchWords.map(word => {
    const test = `(\\b${word})`;

    return test;
  });

  return (
    <Highlighter
      className='wk-highlight-text'
      highlightClassName='wk-highlight-text__highlight'
      searchWords={ patterns }
      textToHighlight={ children }
    />
  );
};

module.exports = HighlightText;
