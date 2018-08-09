'use strict';

const isEqual = require('lodash/isEqual'),
      PropTypes = require('prop-types'),
      React = require('react');

const BarBottom = require('../BarBottom.jsx'),
      Icon = require('../Icon.jsx'),
      MenuBar = require('./MenuBar.jsx'),
      PageMenu = require('./PageMenu.jsx'),
      Pattern = require('../Pattern.jsx'),
      Search = require('./Search.jsx'),
      VersionBar = require('./VersionBar.jsx');

const page = require('../../services/page');

class Navigation extends React.Component {
  static getDerivedStateFromProps (props, state) {
    if (!isEqual(state.previousActivePath, props.activePath)) {
      return {
        previousActivePath: props.activePath,
        activePath: props.activePath,
        expandedPath: props.activePath
      };
    }

    return null;
  }

  constructor (props) {
    super(props);

    this.state = {
      showSearch: false
    };

    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleShowSearch = this.handleShowSearch.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
    this.handleVersionChange = this.handleVersionChange.bind(this);
  }

  handleNavigate (newPath) {
    this.setState({
      expandedPath: newPath
    });
  }

  handleBack () {
    const { activeVersion } = this.state;

    this.setState({
      expandedPath: [ activeVersion ]
    });
  }

  handleShowSearch () {
    this.setState({
      showSearch: true
    });
  }

  handleSearchClose () {
    this.setState({
      showSearch: false
    });
  }

  handleVersionChange (newVersion) {
    const { onVersionChange } = this.props;

    this.setState({
      showSearch: false
    });

    onVersionChange(newVersion);
  }

  render () {
    const {
      activePath,
      activeVersion,
      metadata,
      showLogo,
      onPageClick,
      onLogoClick
    } = this.props;

    const {
      expandedPath,
      showSearch
    } = this.state;

    const expandedPathInfo = page.getInfo(expandedPath);

    return (
      <div className='wk-navigation'>
        <Pattern />

        <div className='wk-navigation__content'>
          <VersionBar
            activeVersion={ activeVersion }
            showLogo={ showLogo }
            versions={ Object.keys(metadata.navigation) }
            onLogoClick={ onLogoClick }
            onVersionChange={ this.handleVersionChange }
          />

          <MenuBar
            backLabel={ expandedPathInfo.breadcrumbs && expandedPathInfo.breadcrumbs[0] }
            onBack={ this.handleBack }
            onShowSearch={ this.handleShowSearch }
          />

          <PageMenu
            activePath={ activePath }
            activeVersion={ activeVersion }
            expandedPath={ expandedPath }
            metadata={ metadata }
            onPageClick={ onPageClick }
            onNavigate={ this.handleNavigate }
          />

          <BarBottom className='wk-navigation__social-bar'>
            <a href='https://github.com/thenativeweb/wolkenkit' target='_blank' rel='noopener noreferrer'><Icon name='github' /></a>
            <a href='http://slackin.wolkenkit.io' target='_blank' rel='noopener noreferrer'><Icon name='slack' /></a>
            <a href='http://stackoverflow.com/questions/tagged/wolkenkit' target='_blank' rel='noopener noreferrer'><Icon name='stackoverflow' /></a>
          </BarBottom>

          { showSearch ? <Search version={ activeVersion } onClose={ this.handleSearchClose } /> : null }
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  activePath: PropTypes.array.isRequired,
  activeVersion: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  showLogo: PropTypes.bool.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onPageClick: PropTypes.func.isRequired,
  onVersionChange: PropTypes.func.isRequired
};

module.exports = Navigation;
