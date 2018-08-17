'use strict';

const merge = require('lodash/merge'),
      themes = require('thenativeweb-ux/dist/themes').default;

const theme = merge({}, themes.wolkenkit, {
  id: 'docs',
  barHeight: 48,
  sidebarWidth: '25vw',
  sidebarWidthMobile: '75vw',
  sidebarFlex: '1 1 25vw',
  sidebarFlexMobile: '1 1 75vw',
  contentWidth: '75vw',
  contentFlex: '3 3 75vw',

  color: {
    panel: {
      dark: '#363D45'
    }
  },

  zIndex: {
    pattern: 100
  }
});

module.exports = theme;
