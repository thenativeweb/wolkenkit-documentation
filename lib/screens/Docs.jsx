'use strict';

const classNames = require('classnames'),
      { Helmet } = require('react-helmet'),
      injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react'),
      { View } = require('thenativeweb-ux');

const IntroPage = require('../components/IntroPage.jsx'),
      MobileNavigation = require('../components/MobileNavigation.jsx'),
      Navigation = require('../components/navigation/Navigation.jsx'),
      PageContent = require('../components/PageContent/index.jsx'),
      Symbols = require('../components/Symbols.jsx');

const page = require('../services/page');

const styles = {
  Docs: {
    position: 'absolute !important',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
};

class Docs extends React.Component {
  constructor (props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleMobileNavigationClick = this.handleMobileNavigationClick.bind(this);
    this.handleVersionChange = this.handleVersionChange.bind(this);

    this.state = {
      activePath: props.activePath,
      activeVersion: props.activeVersion,
      pageContent: props.pageContent,
      pageInfo: props.pageInfo,
      showMobileNav: false
    };
  }

  componentDidMount () {
    const { history } = this.props;

    this.destroyHistory = history.listen(location => {
      const newPath = location.pathname.split('/').filter(item => item);
      const newVersion = page.getVersion(newPath);

      page.load({
        path: newPath
      }, (err, loadedPage) => {
        if (err) {
          return;
        }

        this.setState({
          activePath: newPath,
          activeVersion: newVersion,
          pageContent: loadedPage.content,
          pageInfo: loadedPage.info
        });
      });
    });
  }

  componentWillUnmount () {
    if (typeof this.destroyHistory === 'function') {
      this.destroyHistory();
    }
  }

  handlePageClick (path) {
    const { history } = this.props;

    this.setState({
      showMobileNav: false
    });

    history.push(path);
  }

  handleLogoClick () {
    const { history } = this.props;
    const { activeVersion } = this.state;

    this.setState({
      showMobileNav: false
    });

    history.push(`/${activeVersion}/`);
  }

  handleVersionChange (newVersion) {
    const { history } = this.props;

    history.push(`/${newVersion}/`);
  }

  handleMobileNavigationClick () {
    const { showMobileNav } = this.state;

    this.setState({
      showMobileNav: !showMobileNav
    });
  }

  render () {
    const {
      classes,
      metadata
    } = this.props;

    const {
      activePath,
      activeVersion,
      showMobileNav,
      pageContent,
      pageInfo
    } = this.state;

    const isRootPath = activePath.length <= 1;

    const componentClasses = classNames(classes.Docs, {
      'wk-mobile--nav-visible': showMobileNav
    });

    return (
      <View orientation='horizontal' className={ componentClasses }>
        <Helmet>
          <title>{ metadata.name }</title>
        </Helmet>

        <Symbols />

        <IntroPage
          isCollapsed={ !isRootPath }
        />

        <Navigation
          showLogo={ !isRootPath }
          activePath={ activePath }
          metadata={ metadata }
          activeVersion={ activeVersion }
          isVisibleOnMobile={ showMobileNav }
          onLogoClick={ this.handleLogoClick }
          onPageClick={ this.handlePageClick }
          onVersionChange={ this.handleVersionChange }
        />

        <PageContent
          activePath={ activePath }
          activeVersion={ activeVersion }
          content={ pageContent }
          isCollapsed={ isRootPath }
          info={ pageInfo }
          metadata={ metadata }
        />

        <MobileNavigation
          onClick={ this.handleMobileNavigationClick }
        />
      </View>
    );
  }
}

Docs.propTypes = {
  activePath: PropTypes.array.isRequired,
  activeVersion: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  pageContent: PropTypes.string,
  pageInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

module.exports = injectSheet(styles)(Docs);
