'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Icon = require('../Icon.jsx'),
      page = require('../../services/page'),
      search = require('../../services/search');

class MenuBar extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      showSearch: false,
      searchQuery: '',
      searchResult: undefined
    };

    this.handleBackClicked = this.handleBackClicked.bind(this);
    this.handleSearchClicked = this.handleSearchClicked.bind(this);
    this.handleSearchCloseClicked = this.handleSearchCloseClicked.bind(this);
    this.handleSearchInputChanged = this.handleSearchInputChanged.bind(this);
    this.handleSearchInputKeyPressed = this.handleSearchInputKeyPressed.bind(this);
    this.handleSearchResultClicked = this.handleSearchResultClicked.bind(this);
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
      showSearch: false,
      searchResult: undefined
    });
  }

  handleBackClicked (event) {
    event.stopPropagation();
    event.preventDefault();

    const { onBackClick } = this.props;

    onBackClick();
  }

  handleSearchInputChanged (event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleSearchInputKeyPressed (event) {
    if (event.key === 'Enter') {
      this.setState({
        isSearching: true
      });

      search.query({ query: this.state.searchQuery }, (err, result) => {
        if (err) {
          this.setState({
            searchResult: 'Error while searching'
          });
        }

        this.setState({
          searchResult: result
        });
      });
    }
  }

  handleSearchResultClicked (event) {
    event.stopPropagation();
    event.preventDefault();

    const { history } = this.props;
    const slug = event.target.getAttribute('data-slug');

    history.push(`/${slug}`);

    this.setState({
      showSearch: false,
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

  renderSearchResults () {
    const { searchResult } = this.state;

    if (!searchResult) {
      return;
    }

    return (
      <div className='wk-menu-bar__search-results'>
        {searchResult.map(result => (
          <div
            className='wk-menu-bar__search-results__result'
            key={ result.ref }
          >
            <a
              onClick={ this.handleSearchResultClicked }
              data-slug={ result.ref.replace('index.md', '') }
              href={ `/${result.ref.replace('index.md', '')}` }
            >
              { result.ref }
            </a>
          </div>
        ))}
      </div>
    );
  }

  render () {
    const { showSearch, searchQuery } = this.state;

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
          {this.renderSearchResults()}
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
  onBackClick: PropTypes.func.isRequired
};

module.exports = MenuBar;
