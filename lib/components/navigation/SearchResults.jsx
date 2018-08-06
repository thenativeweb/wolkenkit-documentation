'use strict';

const Highlighter = require('react-highlight-words'),
      React = require('react');

const Icon = require('../Icon.jsx'),
      LoadingIndicator = require('../LoadingIndicator.jsx');

const SearchResults = ({ isVisible, results, onResultClick, query }) => {
  if (isVisible) {
    return (
      <div className='wk-search-results'>
        <div className='wk-search-results__loading-indicator'>
          <LoadingIndicator />
        </div>
      </div>
    );
  }

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
          <div className='wk-search-results__result__page'>
            <a
              onClick={ onResultClick }
              data-path={ result.path }
              href={ `/${result.path}` }
            >
              <Highlighter highlightClassName='wk-search-results__result__highlight' searchWords={ [ query ] } textToHighlight={ result.title } />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

module.exports = SearchResults;