'use strict';

const injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react'),
      { Icon } = require('thenativeweb-ux');

const HighlightText = require('../HighlightText.jsx'),
      Keywords = require('../Keywords.jsx');

const subtleWhite = 'rgba(255, 255, 255, 0.65)';

const styles = theme => ({
  SearchResults: {
    height: `calc(100vh - ${theme.barHeight * 2}px)`,
    'background-color': theme.color.brand.dark,
    overflow: 'scroll',
    '-webkit-overflow-scrolling': 'touch'
  },

  Errors: {
    'margin-top': theme.grid.stepSize * 3,
    padding: theme.grid.stepSize * 1.5,
    'text-align': 'center',
    color: subtleWhite
  },

  ErrorCause: {
    'font-size': theme.font.size.large
  },

  ErrorTip: {
    'margin-top': theme.grid.stepSize * 2,
    'font-weight': 400,

    '& p': {
      margin: '0 0 4px 0'
    }
  },

  ErrorHelp: {
    'margin-top': theme.grid.stepSize,
    'font-weight': 400,
    color: subtleWhite,

    '& p': {
      'margin-bottom': theme.grid.stepSize * 2
    },

    '& a, & a:visited': {
      'margin-right': theme.grid.stepSize * 3,
      color: 'inherit'
    },

    '& a:last-child': {
      'margin-right': 0
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  SocialIcon: {
    fill: 'currentColor'
  },

  SearchResult: {
    margin: 0,
    padding: [ theme.grid.stepSize * 1.5, theme.grid.stepSize * 2 ],
    'border-bottom': '1px solid rgba(255,255,255, 0.1)',
    'font-size': theme.font.size.default
  },

  Path: {
    'font-weight': 400,
    'font-size': theme.font.size.small,
    color: '#66686d',
    'padding-bottom': theme.grid.stepSize / 2,
    display: 'flex',
    'flex-wrap': 'wrap',
    'align-items': 'center'
  },

  Section: {
    display: 'inline',
    color: 'inherit'
  },

  PathSeparator: {
    display: 'inline-flex',
    'margin-left': 2
  },

  PathSeparatorIcon: {
    fill: '#66686d',
    opacity: 0.75
  },

  Chapter: {
    display: 'inline'
  },

  Page: {
    display: 'block',

    '&:link, &:visited': {
      'font-weight': 600,
      color: theme.color.brand.white
    },

    '&:hover, &:focus': {
      color: theme.color.brand.highlight,
      opacity: 1,
      background: 'transparent'
    }
  }
});

const SearchResults = ({ classes, results, query }) => {
  if (!results) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className={ classes.SearchResults }>
        <div
          className={ classes.Errors }
        >
          <div className={ classes.ErrorCause }>Sorry, no pages found.</div>
          <div className={ classes.ErrorTip }>
            Try searching for something else!
          </div>
          <div className={ classes.ErrorHelp }>
            <p>Or get help from the community:</p>
            <a href='http://slackin.wolkenkit.io' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } size='m' name='slack' />
            </a>
            <a href='http://stackoverflow.com/questions/tagged/wolkenkit' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } size='m' name='stackoverflow' />
            </a>
            <a href='https://github.com/thenativeweb/wolkenkit' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } size='m' name='github' />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const searchWords = query.split(' ').filter(word => word !== '');

  return (
    <div className={ classes.SearchResults }>
      {results.map(result => (
        <div
          className={ classes.SearchResult }
          key={ result.path }
        >
          <div className={ classes.Path }>
            <div className={ classes.Section }>
              <HighlightText searchWords={ searchWords }>
                { result.section.title }
              </HighlightText>
            </div>
            { result.chapter ? (
              <React.Fragment>
                <div className={ classes.PathSeparator }>
                  <Icon className={ classes.PathSeparatorIcon } name='chevron' size='s' />
                </div>
                <div className={ classes.Chapter }>
                  <HighlightText searchWords={ searchWords }>
                    { result.chapter.title }
                  </HighlightText>
                </div>
              </React.Fragment>) :
              null }
          </div>
          <a
            className={ classes.Page }
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

module.exports = injectSheet(styles)(SearchResults);
