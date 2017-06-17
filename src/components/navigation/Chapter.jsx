'use strict';

const React = require('react');

const Icon = require('../Icon.jsx'),
      Page = require('./Page.jsx');

class Chapter extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleChapterClicked = this.handleChapterClicked.bind(this);
    this.handlePageClicked = this.handlePageClicked.bind(this);
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

  handlePageClicked (pagePath) {
    const { onPageClick } = this.props;

    onPageClick(pagePath);
  }

  renderPages () {
    const { activePath, history, isExpanded, pages, path } = this.props;

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
                  activePath={ activePath }
                  history={ history }
                  title={ page.title }
                  path={ pagePath }
                  onClick={ this.handlePageClicked }
                />
              );
            }
          )
        }
      </ul>
    );
  }

  render () {
    const { activePath, isExpanded, pages, path, title } = this.props;
    const isActive = activePath.join('/').startsWith(path.join('/'));

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
  activePath: React.PropTypes.array.isRequired,
  history: React.PropTypes.object.isRequired,
  isExpanded: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.array.isRequired,
  path: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onPageClick: React.PropTypes.func.isRequired
};

module.exports = Chapter;
