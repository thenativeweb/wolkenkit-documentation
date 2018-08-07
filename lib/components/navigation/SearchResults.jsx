'use strict';

const Highlighter = require('react-highlight-words'),
      PropTypes = require('prop-types'),
      React = require('react');

const Icon = require('../Icon.jsx');

const renderKeywords = ({ keywords, searchWords }) => {
  if (!keywords) {
    return null;
  }

  return (
    <div className='wk-search-results__result__keywords'>

      { keywords.
        split(' ').
        filter(keyword => keyword !== '').
        map(keyword => (
          <span key={ keyword } className='wk-search-results__result__keywords__keyword'>
            <Highlighter highlightClassName='wk-search-results__result__highlight' searchWords={ searchWords } textToHighlight={ keyword } />
          </span>
        ))}
    </div>
  );
};

const SearchResults = ({ results, query }) => {
  if (!results) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className='wk-search-results'>
        <div
          className='wk-search-results__no-results'
        >
          No pages found…
        </div>
      </div>
    );
  }

  const searchWords = query.split(' ').filter(word => word !== '');

  return (
    <div className='wk-search-results'>
      {results.map(result => (
        <div
          className='wk-search-results__result'
          key={ result.path }
        >
          <div className='wk-search-results__result__path'>
            <div className='wk-search-results__result__section'>{ result.section.title }</div>
            <div className='wk-search-results__result__separator'><Icon name='chevron' size='small' /></div>
            <div className='wk-search-results__result__chapter'>{ result.parent.title }</div>
          </div>
          <a
            className='wk-search-results__result__page'
            data-path={ result.path }
            href={ `/${result.path}` }
          >
            <Highlighter highlightClassName='wk-search-results__result__highlight' searchWords={ searchWords } textToHighlight={ result.title } />
          </a>
          { renderKeywords({ keywords: result.keywords, searchWords }) }
        </div>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired
};

module.exports = SearchResults;
