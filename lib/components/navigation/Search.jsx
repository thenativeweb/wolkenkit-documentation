'use strict';

const injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react');

const Bar = require('../Bar/index.jsx'),
      pages = require('../../services/pages'),
      SearchResults = require('./SearchResults.jsx');

const styles = theme => ({
  Search: {
    position: 'absolute',
    left: 0,
    top: theme.barHeight,
    width: '100%',
    'z-index': theme.zIndex.overlay,
    display: 'flex',
    'flex-direction': 'column'
  },

  SearchBar: {
    'background-color': theme.color.brand.dark
  },

  Query: {
    width: '100%',
    'margin-right': theme.grid.stepSize * 1.5
  },

  QueryInput: {
    width: '100%',
    padding: [ theme.grid.stepSize * 0.5, theme.grid.stepSize, theme.grid.stepSize * 0.5, theme.grid.stepSize * 1.5 ],
    'font-family': theme.font.family.default,
    'font-size': theme.font.size.default,
    'font-weight': 500,
    border: `1px solid ${theme.color.brand.dark}`,
    'border-radius': 0,
    outline: 0
  },

  [theme.device.small]: {
    QueryInput: {
      'font-size': 16
    }
  }
});

class Search extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      query: '',
      results: undefined
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  handleSearchInputChange (event) {
    const { version } = this.props;
    const query = event.target.value;

    if (query.length > 1) {
      const results = pages.search({ query, version });

      this.setState({
        query,
        results
      });

      return;
    }

    this.setState({
      query,
      results: undefined
    });
  }

  render () {
    const { classes, onClose } = this.props;
    const { results, query } = this.state;

    return (
      <div className={ classes.Search }>
        <Bar className={ classes.SearchBar }>
          <Bar.Left className={ classes.Query }>
            <input
              value={ query }
              type='search'
              autoFocus={ true }
              placeholder='Search…'
              className={ classes.QueryInput }
              onChange={ this.handleSearchInputChange }
            />
          </Bar.Left>

          <Bar.Action icon='close' onClick={ onClose } />
        </Bar>
        <SearchResults query={ query } results={ results } />
      </div>
    );
  }
}

Search.propTypes = {
  version: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

module.exports = injectSheet(styles)(Search);
