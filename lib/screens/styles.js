'use strict';

const styles = theme => ({
  '@global': {
    body: {
      color: theme.color.brand.dark,
      'line-height': '1.42857143',
      'font-family': theme.font.family.default,
      'font-weight': 400
    },

    html: {
      '-webkit-font-smoothing': 'antialiased',
      'font-smoothing': 'antialiased',
      'text-shadow': '1px 1px 1px rgba(0,0,0,0.004)'
    },

    'html, body': {
      overflow: 'hidden'
    },

    '*': {
      'box-sizing': 'border-box'
    },

    'ul, ol': {
      margin: 0
    },

    'a, a:visited, a:active': {
      color: theme.color.brand.highlight,
      'text-decoration': 'none'
    },

    table: {
      'border-collapse': 'collapse',
      'border-spacing': 0,

      '& th': {
        'text-align': 'left'
      }
    }
  },

  Docs: {
    position: 'absolute !important',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

module.exports = styles;
