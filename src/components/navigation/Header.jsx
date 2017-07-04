'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Dropdown = require('../Dropdown.jsx');

const page = require('../../services/page');

class NavigationHeader extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleVersionChanged = this.handleVersionChanged.bind(this);
    this.handleLogoClicked = this.handleLogoClicked.bind(this);
  }

  handleLogoClicked (event) {
    event.preventDefault();
    event.stopPropagation();

    const { onLogoClick } = this.props;

    onLogoClick();
  }

  handleVersionChanged (newVersion) {
    const { onVersionChange } = this.props;

    onVersionChange(newVersion);
  }

  renderLogo () {
    const { activePath, showLogo } = this.props;

    if (!showLogo) {
      return null;
    }

    return (
      <a
        onClick={ this.handleLogoClicked }
        href={ `/${page.getVersion(activePath)}/` }
        className='wk-brand-typo'
      >
        <span>wolken</span>kit
      </a>
    );
  }

  render () {
    const { activePath, versions } = this.props;

    if (activePath.length === 0) {
      return null;
    }

    return (
      <div className='wk-bar'>
        <div className='wk-bar__left'>
          {this.renderLogo()}
        </div>
        <div className='wk-bar__right'>
          <Dropdown
            options={ versions }
            selected={ page.getVersion(activePath) }
            onChange={ this.handleVersionChanged }
          />
        </div>
      </div>
    );
  }
}

NavigationHeader.propTypes = {
  activePath: PropTypes.array.isRequired,
  versions: PropTypes.array.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onVersionChange: PropTypes.func.isRequired
};

module.exports = NavigationHeader;
