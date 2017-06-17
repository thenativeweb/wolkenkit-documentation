'use strict';

const hljs = require('highlight.js'),
      markdownIt = require('markdown-it'),
      markdownItAnchor = require('markdown-it-anchor'),
      markdownItContainer = require('markdown-it-container'),
      React = require('react');

const markdown = markdownIt({
  html: true,
  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs ${lang}">${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (__) {
        // Ignore errors
      }
    }

    return `<pre><code class="hljs">${markdown.utils.escapeHtml(str)}</code></pre>`;
  }
}).
  use(markdownItAnchor, {
    permalink: true,
    permalinkSymbol: '#',
    permalinkBefore: true
  }).
  use(markdownItContainer, 'hint-congrats').
  use(markdownItContainer, 'hint-question').
  use(markdownItContainer, 'hint-tip').
  use(markdownItContainer, 'hint-warning').
  use(markdownItContainer, 'hint-wisdom');

class Markdown extends React.PureComponent {
  constructor (props) {
    super(props);

    const { content } = props;

    let renderedMarkdown = '';

    if (content) {
      renderedMarkdown = markdown.render(props.content);
    }

    this.state = {
      renderedMarkdown
    };
  }

  componentWillUpdate (nextProps) {
    if (nextProps.content !== this.props.content) {
      this.setState({
        renderedMarkdown: markdown.render(nextProps.content)
      });
    }
  }

  render () {
    const { component } = this.props;
    const { renderedMarkdown } = this.state;

    return React.createElement(component, { dangerouslySetInnerHTML: { __html: renderedMarkdown }});
  }
}

Markdown.propTypes = {
  component: React.PropTypes.string,
  content: React.PropTypes.string
};

Markdown.defaultProps = {
  component: 'article',
  content: ''
};

module.exports = Markdown;
