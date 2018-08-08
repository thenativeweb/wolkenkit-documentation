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
    this.handleLogoClicked = this.handleLogoClicked.bind(this);
    this.handleMobileNavClicked = this.handleMobileNavClicked.bind(this);
    this.handleVersionChanged = this.handleVersionChanged.bind(this);

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
      const activePath = location.pathname.split('/').filter(item => item);
      const activeVersion = page.getVersion(activePath);

      page.load({
        path: activePath
      }, (err, loadedPage) => {
        if (err) {
          return;
        }

        this.setState({
          activePath,
          activeVersion,
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

  handleLogoClicked () {
    const { history } = this.props;
    const { activeVersion } = this.state;

    this.setState({
      mobileNavVisible: false
    });

    history.push(`/${activeVersion}/`);
  }

  handleVersionChanged (newVersion) {
    const { history } = this.props;

    history.push(`/${newVersion}/`);
  }

  handleMobileNavClicked () {
    const { mobileNavVisible } = this.state;

    this.setState({
      mobileNavVisible: !mobileNavVisible
    });
  }

  render () {
    const {
      history,
      metadata
    } = this.props;

    const {
      activePath,
      activeVersion,
      mobileNavVisible,
      pageContent,
      pageInfo
    } = this.state;

    const isIntroPage = activePath.length <= 1;

    const version = page.getVersion(activePath);

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
          isCollapsed={ !isIntroPage }
        />

        <Navigation
          showLogo={ !isIntroPage }
          activePath={ activePath }
          metadata={ metadata }
          activeVersion={ activeVersion }
          onLogoClick={ this.handleLogoClicked }
          onPageClick={ this.handlePageClick }
          onVersionChange={ this.handleVersionChanged }
        />

        <PageContent
          content={ pageContent }
          history={ history }
          isCollapsed={ isIntroPage }
          info={ pageInfo }
          metadata={ metadata }
          version={ version }
        />

        <MobileNavigation
          onClick={ this.handleMobileNavClicked }
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
