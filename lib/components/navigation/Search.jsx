'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Bar = require('../Bar.jsx'),
      pages = require('../../services/pages'),
      SearchResults = require('./SearchResults.jsx');

class Search extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      query: '',
      results: undefined
    };

    this.handleSearchInputChanged = this.handleSearchInputChanged.bind(this);
  }

  handleSearchInputChanged (event) {
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
    const { results, query } = this.state;
    const { onClose } = this.props;

    return (
      <div className='wk-search'>
        <Bar className='wk-search__bar'>
          <Bar.Left className='wk-search__query'>
            <input
              value={ query }
              type='search'
              autoFocus={ true }
              placeholder='Search…'
              className='wk-search__query__input'
              onChange={ this.handleSearchInputChanged }
              onKeyPress={ this.handleSearchInputKeyPressed }
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

module.exports = Search;
