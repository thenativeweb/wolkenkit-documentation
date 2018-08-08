'use strict';

const Highlighter = require('react-highlight-words'),
      React = require('react');

const HighlightText = ({ children, searchWords }) => {
  if (!children) {
    return null;
  }

  return (
    <Highlighter
      className='wk-highlight-text'
      highlightClassName='wk-highlight-text__highlight'
      searchWords={ searchWords }
      textToHighlight={ children }
    />
  );
};

module.exports = HighlightText;
