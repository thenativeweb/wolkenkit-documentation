'use strict';

const injectSheet = require('react-jss').default,
      React = require('react'),
      { Icon } = require('thenativeweb-ux');

const styles = theme => ({
  Breadcrumbs: {
    display: 'flex',
    'align-items': 'center',
    'min-height': theme.barHeight,
    padding: [ 0, theme.grid.stepSize * 5 ],
    'font-size': theme.font.size.default,
    'line-height': theme.font.size.default,
    'border-bottom': `1px solid ${theme.color.content.border}`,
    color: '#666',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    'white-space': 'nowrap'
  },

  SeparatorIcon: {
    fill: '#aaa',
    margin: [ 1, theme.grid.stepSize / 2, 0, theme.grid.stepSize / 2 ]
  },

  Item: {
    display: 'flex',
    'align-items': 'center'
  },

  [theme.device.small]: {
    Item: {
      '&:last-child': {
        'padding-right': theme.grid.stepSize * 3
      }
    }
  }
});

const renderItems = function ({ breadcrumbs, classes }) {
  if (!Array.isArray(breadcrumbs)) {
    return null;
  }

  return breadcrumbs.map(breadcrumb =>
    (
      <span className={ classes.Item } key={ breadcrumb }>
        <Icon className={ classes.SeparatorIcon } name='chevron' size='s' />
        <span>{ breadcrumb }</span>
      </span>
    ));
};

const Breadcrumbs = function ({ breadcrumbs, classes }) {
  return (
    <div className={ classes.Breadcrumbs }>
      <span>Documentation</span>
      { renderItems({ breadcrumbs, classes }) }
    </div>
  );
};

module.exports = injectSheet(styles)(Breadcrumbs);
