'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

class Page extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handlePageClicked = this.handlePageClicked.bind(this);
  }

  handlePageClicked (event) {
    event.preventDefault();
    event.stopPropagation();

    const { path, onClick } = this.props;

    onClick(`/${path.join('/')}/`);
  }

  render () {
    const { isActive, title, path } = this.props;
    const url = path.join('/');

    let pageClasses = 'wk-page';

    if (isActive) {
      pageClasses += ' wk-page--active';
    }

    return (
      <li className={ pageClasses }><a onClick={ this.handlePageClicked } href={ `/${url}/` }>{ title }</a></li>
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
