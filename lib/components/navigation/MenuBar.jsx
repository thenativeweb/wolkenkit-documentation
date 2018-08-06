'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Bar = require('../Bar.jsx'),
      page = require('../../services/page'),
      Search = require('./Search.jsx');

class MenuBar extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      showSearch: false
    };

    this.handleSearchClicked = this.handleSearchClicked.bind(this);
    this.handleSearchClosed = this.handleSearchClosed.bind(this);
  }

  handleSearchClicked () {
    this.setState({
      showSearch: true
    });
  }

  handleSearchClosed () {
    this.setState({
      showSearch: false
    });
  }

  render () {
    const { expandedPath, version, onBackClick } = this.props;
    const { showSearch } = this.state;

    if (showSearch) {
      return (
        <Search version={ version } onClose={ this.handleSearchClosed } />
      );
    }

    const pageInfo = page.getInfo(expandedPath);

    return (
      <Bar>
        {
          pageInfo.breadcrumbs ?
            <Bar.BackAction onClick={ onBackClick }>{pageInfo.breadcrumbs[0]}</Bar.BackAction> :
            <Bar.Left>Table of contents</Bar.Left>
        }
        <Bar.Action onClick={ this.handleSearchClicked } icon='search' />
      </Bar>
    );
  }
}

MenuBar.propTypes = {
  expandedPath: PropTypes.array.isRequired,
  version: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired
};

module.exports = MenuBar;
