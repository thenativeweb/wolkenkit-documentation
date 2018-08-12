'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      isEqual = require('lodash/isEqual'),
      PropTypes = require('prop-types'),
      React = require('react'),
      { Icon } = require('thenativeweb-ux');

const BarBottom = require('../BarBottom.jsx'),
      MenuBar = require('./MenuBar.jsx'),
      PageMenu = require('./PageMenu.jsx'),
      Pattern = require('../Pattern.jsx'),
      Search = require('./Search.jsx'),
      VersionBar = require('./VersionBar.jsx');

const page = require('../../services/page');

const styles = theme => ({
  Navigation: {
    position: 'relative',
    flex: theme.sidebarFlex,
    width: theme.sidebarWidth,
    height: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'background-color': theme.color.brand.dark,
    overflow: 'hidden'
  },

  Content: {
    display: 'flex',
    flex: '1 1 100%',
    'flex-direction': 'column',
    'z-index': theme.zIndex.navigation + +1,
    position: 'relative'
  },

  SocialBar: {
    '& a': {
      display: 'flex',
      'margin-right': theme.grid.stepSize * 3
    },

    '& a:last-child': {
      'margin-right': 0
    }
  },

  SocialIcon: {
    width: 22,
    height: 22,
    fill: 'currentColor'
  },

  [theme.device.small]: {
    Navigation: {
      position: 'fixed',
      top: 0,
      left: 0,
      'pointer-events': 'none',
      'z-index': theme.zIndex.navigation,
      flex: theme.sidebarFlexMobile,
      width: theme.sidebarWidthMobile,
      transform: `translate(-30%,0)`,
      transition: 'transform 500ms cubic-bezier(0.190, 1.000, 0.220, 1.000), opacity 400ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
      'will-change': 'transform',
      opacity: 0
    },

    IsVisibleOnMobile: {
      'pointer-events': 'auto',
      transform: 'translate(0,0)',
      opacity: 1
    }
  }
});

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
      classes,
      isVisibleOnMobile,
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

    const componentClasses = classNames(classes.Navigation, {
      [classes.IsVisibleOnMobile]: isVisibleOnMobile
    });

    return (
      <div className={ componentClasses }>
        <Pattern />

        <div className={ classes.Content }>
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

          <BarBottom className={ classes.SocialBar }>
            <a href='https://github.com/thenativeweb/wolkenkit' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } name='github' />
            </a>
            <a href='http://slackin.wolkenkit.io' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } name='slack' />
            </a>
            <a href='http://stackoverflow.com/questions/tagged/wolkenkit' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } name='stackoverflow' />
            </a>
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
  isVisibleOnMobile: PropTypes.bool.isRequired,
  metadata: PropTypes.object.isRequired,
  showLogo: PropTypes.bool.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onPageClick: PropTypes.func.isRequired,
  onVersionChange: PropTypes.func.isRequired
};

module.exports = injectSheet(styles)(Navigation);
