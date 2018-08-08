'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Icon = require('../Icon.jsx');

class Section extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleItemClicked = this.handleItemClicked.bind(this);
  }

  handleItemClicked (event) {
    const { onClick, path } = this.props;

    event.preventDefault();
    event.stopPropagation();

    onClick(path);
  }

  render () {
    const { isActive, title } = this.props;

    let sectionClasses = 'wk-section';

    if (isActive) {
      sectionClasses += ' wk-section--active';
    }

    return (
      <div className={ sectionClasses }>
        <a href='#' onClick={ this.handleItemClicked }>
          <div className='label'>{ title }</div>
          <Icon name='chevron' />
        </a>
      </div>
    );
  }
}

Section.propTypes = {
  isActive: PropTypes.bool.isRequired,
  path: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

module.exports = Section;
