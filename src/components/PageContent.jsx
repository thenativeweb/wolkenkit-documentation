'use strict';

const Helmet = require('react-helmet'),
      React = require('react');

const Breadcrumbs = require('./Breadcrumbs.jsx'),
      Markdown = require('./Markdown.jsx'),
      PageFooter = require('./PageFooter.jsx');

class PageContent extends React.Component {
  constructor (props) {
    super(props);

    this.saveContainerRef = this.saveContainerRef.bind(this);
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
        <Helmet title={ pageTitle } />

        <Breadcrumbs breadcrumbs={ info.breadcrumbs } />

        <Markdown content={ content } />

        <PageFooter history={ history } version={ version } />
      </div>
    );
  }
}

PageContent.propTypes = {
  history: React.PropTypes.object.isRequired,
  metadata: React.PropTypes.object.isRequired,
  version: React.PropTypes.string.isRequired,
  content: React.PropTypes.string,
  info: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ])
};

module.exports = PageContent;
