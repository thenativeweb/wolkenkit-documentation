'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Icon = require('../Icon.jsx'),
      page = require('../../services/page'),
      pages = require('../../services/pages'),
      SearchResults = require('./SearchResults.jsx');

class MenuBar extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      showSearch: false,
      searchQuery: '',
      isSearching: false,
      searchResult: undefined
    };

    this.handleBackClicked = this.handleBackClicked.bind(this);
    this.handleSearchClicked = this.handleSearchClicked.bind(this);
    this.handleSearchCloseClicked = this.handleSearchCloseClicked.bind(this);
    this.handleSearchInputChanged = this.handleSearchInputChanged.bind(this);
  }

  handleSearchClicked (event) {
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      showSearch: true
    });
  }

  handleSearchCloseClicked (event) {
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      showSearch: false
    });
  }

  handleBackClicked (event) {
    event.stopPropagation();
    event.preventDefault();

    const { onBackClick } = this.props;

    onBackClick();
  }

  handleSearchInputChanged (event) {
    const { version } = this.props;
    const searchQuery = event.target.value;

    if (searchQuery.length > 1) {
      const results = pages.search({ query: searchQuery, version });

      this.setState({
        searchQuery,
        searchResult: results
      });

      return;
    }

    this.setState({
      searchQuery,
      searchResult: undefined
    });
  }

  renderBackButton () {
    const {
      expandedPath
    } = this.props;

    if (expandedPath.length === 0) {
      return <div className='wk-bar__left'>Table of contents</div>;
    }

    const pageInfo = page.getInfo(expandedPath);

    if (!pageInfo.breadcrumbs) {
      return <div className='wk-bar__left'>Table of contents</div>;
    }

    return (
      <div className='wk-bar__back'>
        <a onClick={ this.handleBackClicked } href='#back'>
          <Icon name='back' />
          <span className='label'>{pageInfo.breadcrumbs[0]}</span>
        </a>
      </div>
    );
  }

  renderSearchButton () {
    return (
      <div className='wk-bar__right wk-bar__search'>
        <a onClick={ this.handleSearchClicked } href='#search'>
          <Icon name='search' size='small' />
        </a>
      </div>
    );
  }

  render () {
    const { showSearch, isSearching, searchResult, searchQuery } = this.state;

    if (showSearch) {
      return (
        <div className='wk-bar wk-menu-bar'>
          <div className='wk-bar__left wk-menu-bar__search'>
            <input
              value={ searchQuery }
              type='search'
              autoFocus={ true }
              placeholder='Search…'
              className='wk-menu-bar__search-input'
              onChange={ this.handleSearchInputChanged }
              onKeyPress={ this.handleSearchInputKeyPressed }
            />
          </div>
          <div className='wk-bar__right wk-bar__close'>
            <a onClick={ this.handleSearchCloseClicked } href='#close'>
              <Icon name='close' size='small' />
            </a>
          </div>
          <SearchResults isVisible={ isSearching } query={ searchQuery } results={ searchResult } />
        </div>
      );
    }

    return (
      <div className='wk-bar'>
        {this.renderBackButton()}
        {this.renderSearchButton()}
      </div>
    );
  }
}

MenuBar.propTypes = {
  expandedPath: PropTypes.array.isRequired,
  version: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired
};

module.exports = MenuBar;
