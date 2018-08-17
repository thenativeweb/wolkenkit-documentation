'use strict';

/* eslint-disable no-process-env, global-require */
if (process.env.APP_ENV === 'browser') {
  require('../../node_modules/highlight.js/styles/atom-one-dark.css');
}
/* eslint-enable no-process-env, global-require */

const hljs = require('highlight.js/lib/highlight'),
      markdownIt = require('markdown-it'),
      markdownItAnchor = require('markdown-it-anchor'),
      markdownItContainer = require('markdown-it-container'),
      memoize = require('lodash/memoize'),
      PropTypes = require('prop-types'),
      React = require('react');

const css = require('highlight.js/lib/languages/css'),
      javascript = require('highlight.js/lib/languages/javascript'),
      json = require('highlight.js/lib/languages/json'),
      shell = require('highlight.js/lib/languages/shell'),
      xml = require('highlight.js/lib/languages/xml');

hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('xml', xml);

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

const Markdown = function ({ component, className, content }) {
  return React.createElement(component, { className, dangerouslySetInnerHTML: { __html: renderMarkdown(content) }});
};

Markdown.propTypes = {
  className: PropTypes.string,
  component: PropTypes.string,
  content: PropTypes.string
};

Markdown.defaultProps = {
  component: 'article',
  content: ''
};

module.exports = Markdown;
