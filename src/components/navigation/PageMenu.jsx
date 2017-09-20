'use strict';

const isEqual = require('lodash/isEqual'),
      PropTypes = require('prop-types'),
      React = require('react');

const Chapter = require('./Chapter.jsx'),
      Icon = require('../Icon.jsx'),
      MenuBar = require('./MenuBar.jsx'),
      Page = require('./Page.jsx'),
      Section = require('./Section.jsx');

const page = require('../../services/page');

class PageMenu extends React.Component {
  constructor (props) {
    super(props);

    this.handleItemClicked = this.handleItemClicked.bind(this);
    this.handleBackClicked = this.handleBackClicked.bind(this);
    this.handlePageClicked = this.handlePageClicked.bind(this);

    this.state = {
      activePath: props.activePath,
      expandedPath: props.activePath
    };
  }

  componentWillUpdate (nextProps) {
    if (!isEqual(nextProps.activePath, this.props.activePath)) {
      this.setState({
        activePath: nextProps.activePath,
        expandedPath: nextProps.activePath
      });
    }
  }

  handleItemClicked (newPath) {
    this.setState({
      expandedPath: newPath
    });
  }

  handleBackClicked () {
    const { activePath } = this.props;

    this.setState({
      expandedPath: [ page.getVersion(activePath) ]
    });
  }

  handlePageClicked (path) {
    const { onNavigated } = this.props;

    onNavigated(path);
  }

  renderTopLevel (navigation) {
    if (!navigation) {
      return null;
    }

    const { activePath } = this.props;
    const activeVersion = page.getVersion(activePath);

    return navigation.map(
      section => (
        <Section
          key={ section.slug }
          activePath={ activePath }
          title={ section.title }
          path={ [ activeVersion, section.slug ] }
          onClick={ this.handleItemClicked }
        />
      ));
  }

  renderSecondLevel (navigation) {
    const { history } = this.props;
    const { activePath, expandedPath } = this.state;

    if (expandedPath.length >= 2) {
      const activeVersion = page.getVersion(activePath);
      const expandedSectionSlug = page.getSection(expandedPath);
      const expandedChapterSlug = page.getChapter(expandedPath);
      const expandedSection = navigation.find(item => item.slug === expandedSectionSlug);

      if (!expandedSection || !expandedSection.children) {
        return null;
      }

      return expandedSection.children.map(
        chapter => {
          if (!chapter.children) {
            return (
              <Page
                key={ chapter.slug }
                activePath={ activePath }
                history={ history }
                title={ chapter.title }
                path={ [ activeVersion, expandedSectionSlug, chapter.slug ] }
                onClick={ this.handlePageClicked }
              />
            );
          }

          return (
            <Chapter
              key={ chapter.slug }
              activePath={ activePath }
              history={ history }
              isExpanded={ expandedChapterSlug === chapter.slug }
              path={ [ activeVersion, expandedSectionSlug, chapter.slug ] }
              title={ chapter.title }
              pages={ chapter.children }
              onClick={ this.handleItemClicked }
              onPageClick={ this.handlePageClicked }
            />
          );
        }
      );
    }

    return null;
  }

  render () {
    const {
      metadata
    } = this.props;

    const { expandedPath } = this.state;

    const version = page.getVersion(expandedPath);

    const navigation = metadata.navigation[version];

    let levelsStyle = {
      transform: `translate(0, 0)`
    };

    if (expandedPath.length > 1) {
      levelsStyle = {
        transform: `translate(-50%, 0)`
      };
    }

    return (
      <div className='wk-page-menu'>
        <MenuBar
          expandedPath={ expandedPath }
          onBackClick={ this.handleBackClicked }
        />
        <div className='wk-menu__levels-container' ref={ this.handleMenuLevelChanged }>
          <div className='wk-menu-levels' style={ levelsStyle }>
            <div className='wk-menu-level wk-menu-level--top'>
              { this.renderTopLevel(navigation) }
            </div>
            <div className='wk-menu-level wk-menu-level--second'>
              { this.renderSecondLevel(navigation) }
            </div>
          </div>
        </div>
        <div className='wk-menu__social-bar wk-bar wk-bar--bottom wk-bar--centered'>
          <a href='https://github.com/thenativeweb/wolkenkit'><Icon name='github' /></a>
          <a href='http://slackin.wolkenkit.io'><Icon name='slack' /></a>
          <a href='http://stackoverflow.com/questions/tagged/wolkenkit'><Icon name='stackoverflow' /></a>
        </div>
      </div>
    );
  }
}

PageMenu.propTypes = {
  activePath: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  onNavigated: PropTypes.func.isRequired
};

module.exports = PageMenu;
