'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Icon = require('../Icon.jsx'),
      Page = require('./Page.jsx');

class Chapter extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleChapterClicked = this.handleChapterClicked.bind(this);
  }

  handleChapterClicked (event) {
    const { isExpanded, onClick, path } = this.props;

    event.preventDefault();
    event.stopPropagation();

    if (isExpanded) {
      onClick(path.slice(0, -1));
    } else {
      onClick(path);
    }
  }

  renderPages () {
    const { activePath, isExpanded, pages, path, onPageClick } = this.props;

    if (!isExpanded) {
      return null;
    }

    return (
      <ul className='wk-chapter__pages'>
        {
          pages.map(
            page => {
              const pagePath = path.slice(0);

              pagePath.push(page.slug);

              return (
                <Page
                  key={ page.slug }
                  isActive={ activePath.join('/') === pagePath.join('/') }
                  title={ page.title }
                  path={ pagePath }
                  onClick={ onPageClick }
                />
              );
            }
          )
        }
      </ul>
    );
  }

  render () {
    const { isActive, isExpanded, pages, title } = this.props;

    let chapterClasses = 'wk-chapter';

    if (isExpanded) {
      chapterClasses += ' wk-chapter--expanded';
    }

    if (isActive) {
      chapterClasses += ' wk-chapter--active';
    }

    if (pages) {
      return (
        <div className={ chapterClasses }>
          <a href='#' className='wk-chapter__title' onClick={ this.handleChapterClicked }>
            <Icon name='expand' />
            <span>{ title }</span>
          </a>
          {this.renderPages()}
        </div>
      );
    }
  }
}

Chapter.propTypes = {
  activePath: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  pages: PropTypes.array.isRequired,
  path: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onPageClick: PropTypes.func.isRequired
};

module.exports = Chapter;
