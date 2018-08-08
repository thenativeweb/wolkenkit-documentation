'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const HighlightText = require('../HighlightText.jsx'),
      Icon = require('../Icon.jsx'),
      Keywords = require('../Keywords.jsx');

const SearchResults = ({ results, query }) => {
  if (!results) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className='wk-search-results'>
        <div
          className='wk-search-results__error'
        >
          <div className='wk-search-results__error__cause'>Sorry, no pages found.</div>
          <div className='wk-search-results__error__tip'>
            Try searching for something else!
          </div>
          <div className='wk-search-results__error__help'>
            <p>Or get help from the community…</p>
            <a href='http://slackin.wolkenkit.io' target='_blank' rel='noopener noreferrer'><Icon name='slack' /></a>
            <a href='http://stackoverflow.com/questions/tagged/wolkenkit' target='_blank' rel='noopener noreferrer'><Icon name='stackoverflow' /></a>
            <a href='https://github.com/thenativeweb/wolkenkit' target='_blank' rel='noopener noreferrer'><Icon name='github' /></a>
          </div>
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
            <div className='wk-search-results__result__section'>{ result.section && result.section.title }</div>
            { result.chapter ? (
              <React.Fragment>
                <div className='wk-search-results__result__separator'><Icon name='chevron' size='small' /></div>
                <div className='wk-search-results__result__chapter'>
                  <HighlightText searchWords={ searchWords }>
                    { result.chapter.title }
                  </HighlightText>
                </div>
              </React.Fragment>) :
              null }
          </div>
          <a
            className='wk-search-results__result__page'
            data-path={ result.path }
            href={ `/${result.path}` }
          >
            <HighlightText searchWords={ searchWords }>
              { result.title }
            </HighlightText>
          </a>
          <Keywords keywords={ result.keywords } searchWords={ searchWords } />
        </div>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.array
};

module.exports = SearchResults;
