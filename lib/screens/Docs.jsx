'use strict';

const { Helmet } = require('react-helmet'),
      PropTypes = require('prop-types'),
      React = require('react');

const IntroPage = require('../components/IntroPage.jsx'),
      MobileNavigation = require('../components/MobileNavigation.jsx'),
      Navigation = require('../components/navigation/Navigation.jsx'),
      PageContent = require('../components/PageContent.jsx'),
      Symbols = require('../components/Symbols.jsx');

const page = require('../services/page');

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
      pageInfo: props.pageInfo
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
      mobileNavVisible: false
    });

    history.push(path);
  }

  handleLogoClick () {
    const { history } = this.props;
    const { activeVersion } = this.state;

    this.setState({
      mobileNavVisible: false
    });

    history.push(`/${activeVersion}/`);
  }

  handleVersionChange (newVersion) {
    const { history } = this.props;

    history.push(`/${newVersion}/`);
  }

  handleMobileNavigationClick () {
    const { mobileNavVisible } = this.state;

    this.setState({
      mobileNavVisible: !mobileNavVisible
    });
  }

  render () {
    const {
      metadata
    } = this.props;

    const {
      activePath,
      activeVersion,
      mobileNavVisible,
      pageContent,
      pageInfo
    } = this.state;

    const isRootPath = activePath.length <= 1;

    let classes = 'wk-docs';

    if (mobileNavVisible) {
      classes += ' wk-mobile--nav-visible';
    }

    return (
      <div className={ classes }>
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
      </div>
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

module.exports = Docs;
