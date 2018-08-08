'use strict';

const React = require('react');

const HighlightText = require('./HighlightText.jsx');

const Keywords = ({ className, keywords, searchWords }) => {
  if (!keywords) {
    return null;
  }

  return (
    <div className={ `wk-keywords ${className}` }>
      { keywords.
        split(' ').
        filter(keyword => keyword !== '').
        map(keyword => (
          <span key={ keyword } className='wk-keywords__keyword'>
            <HighlightText searchWords={ searchWords }>{ keyword }</HighlightText>
          </span>
        ))}
    </div>
  );
};

module.exports = Keywords;
