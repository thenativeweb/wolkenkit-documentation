'use strict';

const { Helmet } = require('react-helmet'),
      PropTypes = require('prop-types'),
      React = require('react');

const IntroPage = require('../components/IntroPage.jsx'),
      MobileNavigation = require('../components/MobileNavigation.jsx'),
      Navigation = require('../components/Navigation.jsx'),
      PageContent = require('../components/PageContent.jsx'),
      Symbols = require('../components/Symbols.jsx');

const page = require('../services/page');

class Docs extends React.Component {
  constructor (props) {
    super(props);

    this.handleNavigated = this.handleNavigated.bind(this);
    this.handleLogoClicked = this.handleLogoClicked.bind(this);
    this.handleMobileNavClicked = this.handleMobileNavClicked.bind(this);
    this.handleVersionChanged = this.handleVersionChanged.bind(this);

    this.state = {
      activePath: props.activePath,
      pageContent: props.pageContent,
      pageInfo: props.pageInfo
    };
  }

  componentDidMount () {
    const { history } = this.props;

    this.destroyHistory = history.listen(location => {
      const activePath = location.pathname.split('/').filter(item => item);

      page.load({
        path: activePath
      }, (err, loadedPage) => {
        if (err) {
          return;
        }

        this.setState({
          activePath,
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

  handleNavigated (path) {
    const { history } = this.props;

    this.setState({
      mobileNavVisible: false
    });

    history.push(path);
  }

  handleLogoClicked () {
    const { history, activePath } = this.props;

    this.setState({
      mobileNavVisible: false
    });

    history.push(`/${page.getVersion(activePath)}/`);
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
          history={ history }
          metadata={ metadata }
          onLogoClick={ this.handleLogoClicked }
          onNavigated={ this.handleNavigated }
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
  history: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  pageContent: PropTypes.string,
  pageInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

module.exports = Docs;
