'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Icon = require('../Icon.jsx'),
      page = require('../../services/page');

class MenuBar extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleBackClicked = this.handleBackClicked.bind(this);
  }

  handleBackClicked (event) {
    const { onBackClick } = this.props;

    event.stopPropagation();
    event.preventDefault();

    onBackClick();
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

  render () {
    return (
      <div className='wk-bar'>
        {this.renderBackButton()}
      </div>
    );
  }
}

MenuBar.propTypes = {
  expandedPath: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired
};

module.exports = MenuBar;
