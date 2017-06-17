'use strict';

const isEqual = require('lodash/isEqual'),
      React = require('react');

const Icon = require('../Icon.jsx'),
      page = require('../../services/page');

class Section extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleItemClicked = this.handleItemClicked.bind(this);
  }

  componentWillUpdate (nextProps) {
    const { activePath, path } = this.props;

    if (isEqual(nextProps.activePath, activePath)) {
      return;
    }

    this.setState({
      isActive: page.getSection(activePath) === page.getSection(path)
    });
  }

  handleItemClicked (event) {
    const { onClick, path } = this.props;

    event.preventDefault();
    event.stopPropagation();

    onClick(path);
  }

  render () {
    const { activePath, title, path } = this.props;
    const isActive = page.getSection(activePath) === page.getSection(path);

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
  activePath: React.PropTypes.array.isRequired,
  path: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};

module.exports = Section;
