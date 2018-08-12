'use strict';

const injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react');

const Chapter = require('./Chapter.jsx'),
      Page = require('./Page.jsx'),
      Section = require('./Section.jsx');

const page = require('../../services/page');

const styles = theme => ({
  PageMenu: {
    flex: '1 1 100%',
    display: 'flex',
    'flex-direction': 'column',
    overflow: 'hidden',
    position: 'relative'
  },

  Levels: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    'flex-direction': 'row',
    transform: 'translate(0, 0)',
    transition: 'transform 500ms cubic-bezier(0.075, 0.820, 0.165, 1.000)',
    'will-change': 'transform'
  },

  Level: {
    flex: '0 0 auto',
    height: '100%',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    width: theme.sidebarWidth
  },

  [theme.device.small]: {
    Level: {
      width: theme.sidebarWidthMobile
    }
  }
});

class PageMenu extends React.Component {
  static renderTopLevel ({ activePath, activeVersion, navigation, onNavigate }) {
    if (!navigation) {
      return null;
    }

    return navigation.map(
      section => {
        const sectionPath = [ activeVersion, section.slug ];

        return (
          <Section
            key={ section.slug }
            isActive={ page.getSection(activePath) === page.getSection(sectionPath) }
            title={ section.title }
            path={ sectionPath }
            onClick={ onNavigate }
          />
        );
      }
    );
  }

  static renderSecondLevel ({ activeVersion, activePath, expandedPath, navigation, onNavigate, onPageClick }) {
    if (expandedPath.length < 2) {
      return null;
    }

    const expandedSectionSlug = page.getSection(expandedPath);
    const expandedChapterSlug = page.getChapter(expandedPath);
    const expandedSection = navigation.find(item => item.slug === expandedSectionSlug);

    if (!expandedSection || !expandedSection.children) {
      return null;
    }

    return expandedSection.children.map(
      chapter => {
        const itemPath = [ activeVersion, expandedSectionSlug, chapter.slug ];

        if (!chapter.children) {
          return (
            <Page
              key={ chapter.slug }
              isActive={ activePath.join('/') === itemPath.join('/') }
              title={ chapter.title }
              path={ itemPath }
              onClick={ onPageClick }
            />
          );
        }

        return (
          <Chapter
            key={ chapter.slug }
            activePath={ activePath }
            isExpanded={ expandedChapterSlug === chapter.slug }
            isActive={ activePath.join('/').startsWith(itemPath.join('/')) }
            path={ itemPath }
            title={ chapter.title }
            pages={ chapter.children }
            onClick={ onNavigate }
            onPageClick={ onPageClick }
          />
        );
      }
    );
  }

  render () {
    const {
      activePath,
      activeVersion,
      classes,
      expandedPath,
      metadata,
      onNavigate,
      onPageClick
    } = this.props;

    const navigation = metadata.navigation[activeVersion];

    let levelsStyle = {
      transform: `translate(0, 0)`
    };

    if (expandedPath.length > 1) {
      levelsStyle = {
        transform: `translate(-50%, 0)`
      };
    }

    return (
      <div className={ classes.PageMenu }>
        <div className={ classes.Levels } style={ levelsStyle }>
          <div className={ classes.Level }>
            {
              PageMenu.renderTopLevel({
                activePath,
                activeVersion,
                navigation,
                onNavigate
              })
            }
          </div>
          <div className={ classes.Level }>
            {
              PageMenu.renderSecondLevel({
                activeVersion,
                activePath,
                expandedPath,
                navigation,
                onNavigate,
                onPageClick
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

PageMenu.propTypes = {
  activePath: PropTypes.array.isRequired,
  activeVersion: PropTypes.string.isRequired,
  expandedPath: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onPageClick: PropTypes.func.isRequired
};

module.exports = injectSheet(styles)(PageMenu);
