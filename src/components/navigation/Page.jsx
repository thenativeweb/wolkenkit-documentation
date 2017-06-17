'use strict';

const React = require('react');

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
    const { activePath, title, path } = this.props;
    const url = `${path.join('/')}`;
    const isActive = activePath.join('/') === url;
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
  activePath: React.PropTypes.array.isRequired,
  path: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};

module.exports = Page;
