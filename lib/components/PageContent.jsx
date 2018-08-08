'use strict';

const { Helmet } = require('react-helmet'),
      PropTypes = require('prop-types'),
      React = require('react');

const Breadcrumbs = require('./Breadcrumbs.jsx'),
      Markdown = require('./Markdown.jsx'),
      PageFooter = require('./PageFooter.jsx');

class PageContent extends React.Component {
  constructor (props) {
    super(props);

    this.saveContainerRef = this.saveContainerRef.bind(this);
  }

  componentDidMount () {
    const anchor = global.location.hash;

    if (anchor) {
      const anchorElement = global.document.querySelector(anchor);

      if (anchorElement && this.container) {
        this.container.scrollTop = anchorElement.offsetTop;
      }
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.content !== this.props.content && this.container) {
      this.container.scrollTop = 0;
    }
  }

  saveContainerRef (ref) {
    this.container = ref;
  }

  render () {
    const { content, history, isCollapsed, info, metadata, version } = this.props;

    let pageContentClasses = 'wk-page-content',
        pageTitle = metadata.name;

    if (isCollapsed) {
      pageContentClasses += ' wk-page-content--collapsed';
    }

    if (info.title) {
      pageTitle = `${info.title} | ${metadata.name}`;
    }

    return (
      <div ref={ this.saveContainerRef } className={ pageContentClasses }>
        <Helmet>
          <title>{ pageTitle }</title>
        </Helmet>

        <Breadcrumbs breadcrumbs={ info.breadcrumbs } />

        <Markdown content={ content } />

        <PageFooter history={ history } version={ version } />
      </div>
    );
  }
}

PageContent.propTypes = {
  history: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
  content: PropTypes.string,
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

module.exports = PageContent;
