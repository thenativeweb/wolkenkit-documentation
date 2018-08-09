'use strict';

const hljs = require('highlight.js'),
      markdownIt = require('markdown-it'),
      markdownItAnchor = require('markdown-it-anchor'),
      markdownItContainer = require('markdown-it-container'),
      memoize = require('lodash/memoize'),
      PropTypes = require('prop-types'),
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

const renderMarkdown = memoize(content => markdown.render(content));

const Markdown = function ({ component, content }) {
  return React.createElement(component, { dangerouslySetInnerHTML: { __html: renderMarkdown(content) }});
};

Markdown.propTypes = {
  component: PropTypes.string,
  content: PropTypes.string
};

Markdown.defaultProps = {
  component: 'article',
  content: ''
};

module.exports = Markdown;
