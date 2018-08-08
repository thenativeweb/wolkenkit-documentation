'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Bar = require('../Bar.jsx'),
      Dropdown = require('../Dropdown.jsx');

class VersionBar extends React.PureComponent {
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
    const { activeVersion, showLogo } = this.props;

    if (!showLogo) {
      return null;
    }

    return (
      <a
        onClick={ this.handleLogoClicked }
        href={ `/${activeVersion}/` }
        className='wk-brand-typo'
      >
        <span>wolken</span>kit
      </a>
    );
  }

  render () {
    const { activeVersion, versions } = this.props;

    return (
      <Bar>
        <Bar.Left>
          {this.renderLogo()}
        </Bar.Left>
        <Bar.Right>
          <Dropdown
            options={ versions }
            selected={ activeVersion }
            onChange={ this.handleVersionChanged }
          />
        </Bar.Right>
      </Bar>
    );
  }
}

VersionBar.propTypes = {
  activeVersion: PropTypes.string.isRequired,
  versions: PropTypes.array.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onVersionChange: PropTypes.func.isRequired
};

module.exports = VersionBar;
