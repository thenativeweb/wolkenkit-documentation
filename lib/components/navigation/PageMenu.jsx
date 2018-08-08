'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Chapter = require('./Chapter.jsx'),
      Page = require('./Page.jsx'),
      Section = require('./Section.jsx');

const page = require('../../services/page');

class PageMenu extends React.Component {
  renderTopLevel (navigation) {
    if (!navigation) {
      return null;
    }

    const { activePath, activeVersion, onNavItemClick } = this.props;

    return navigation.map(
      section => {
        const sectionPath = [ activeVersion, section.slug ];

        return (
          <Section
            key={ section.slug }
            isActive={ page.getSection(activePath) === page.getSection(sectionPath) }
            title={ section.title }
            path={ sectionPath }
            onClick={ onNavItemClick }
          />
        );
      }
    );
  }

  renderSecondLevel (navigation) {
    const {
      activeVersion,
      activePath,
      expandedPath,
      onNavItemClick,
      onPageClick
    } = this.props;

    if (expandedPath.length >= 2) {
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
              onClick={ onNavItemClick }
              onPageClick={ onPageClick }
            />
          );
        }
      );
    }

    return null;
  }

  render () {
    const { activeVersion, expandedPath, metadata } = this.props;

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
      <div className='wk-page-menu'>
        <div className='wk-menu__levels-container'>
          <div className='wk-menu-levels' style={ levelsStyle }>
            <div className='wk-menu-level wk-menu-level--top'>
              { this.renderTopLevel(navigation) }
            </div>
            <div className='wk-menu-level wk-menu-level--second'>
              { this.renderSecondLevel(navigation) }
            </div>
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
  onNavItemClick: PropTypes.func.isRequired,
  onPageClick: PropTypes.func.isRequired
};

module.exports = PageMenu;
