'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react'),
      { Icon } = require('thenativeweb-ux');

const Page = require('./Page.jsx');

const styles = theme => ({
  Chapter: {
    flex: '1 1 100%'
  },

  Title: {
    display: 'flex',
    'align-items': 'flex-start',
    padding: [ theme.grid.stepSize * 0.5, theme.grid.stepSize, theme.grid.stepSize * 0.5, theme.grid.stepSize * 1.5 ],
    margin: 0,
    'margin-top': 10,
    'line-height': 1.1,
    color: `${theme.color.brand.white} !important`,
    cursor: 'pointer',
    'text-decoration': 'none',
    opacity: 0.5,

    '&:hover': {
      color: theme.color.brand.white,
      opacity: 1
    }
  },

  ExpandIcon: {
    width: 12,
    height: 12,
    fill: 'currentColor',
    transform: 'rotate(0)',
    transition: 'transform 150ms ease-in-out',
    'margin-top': 3,
    'margin-right': 6
  },

  IsExpanded: {
    '& $ExpandIcon': {
      transform: 'rotate(90deg)'
    }
  },

  IsActive: {
    '& $Title': {
      'font-weight': 600,
      opacity: 1
    }
  },

  Pages: {
    padding: 0
  }
});

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
    const { activePath, classes, isActive, isExpanded, pages, path, onPageClick } = this.props;

    if (!isExpanded) {
      return null;
    }

    return (
      <ul className={ classes.Pages }>
        {
          pages.map(
            page => {
              const pagePath = path.slice(0);

              pagePath.push(page.slug);

              return (
                <Page
                  key={ page.slug }
                  isActive={ activePath.join('/') === pagePath.join('/') }
                  isEmphasized={ isActive }
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
    const { classes, isActive, isExpanded, pages, title } = this.props;

    const componentClasses = classNames(classes.Chapter, {
      [classes.IsActive]: isActive,
      [classes.IsExpanded]: isExpanded
    });

    if (pages) {
      return (
        <div className={ componentClasses }>
          <a href='#' className={ classes.Title } onClick={ this.handleChapterClicked }>
            <Icon className={ classes.ExpandIcon } name='expand' />
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

module.exports = injectSheet(styles)(Chapter);
