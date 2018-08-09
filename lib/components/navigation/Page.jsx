'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

class Page extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handlePageClicked = this.handlePageClicked.bind(this);
  }

  getUrl () {
    return `/${this.props.path.join('/')}/`;
  }

  handlePageClicked (event) {
    event.preventDefault();
    event.stopPropagation();

    const { onClick } = this.props;

    onClick(this.getUrl());
  }

  render () {
    const { isActive, title } = this.props;

    let pageClasses = 'wk-page';

    if (isActive) {
      pageClasses += ' wk-page--active';
    }

    return (
      <li className={ pageClasses }><a onClick={ this.handlePageClicked } href={ this.getUrl() }>{ title }</a></li>
    );
  }
}

Page.propTypes = {
  isActive: PropTypes.bool.isRequired,
  path: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

module.exports = Page;
