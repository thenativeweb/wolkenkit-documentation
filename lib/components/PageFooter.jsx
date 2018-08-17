'use strict';

const injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react'),
      { Brand } = require('thenativeweb-ux');

const styles = theme => ({
  PageFooter: {
    margin: [ theme.grid.stepSize * 3, 0, 0, 0 ],
    padding: [ theme.grid.stepSize * 3, theme.grid.stepSize * 5 ],
    'font-size': theme.font.size.default,
    'font-weight': 300,

    '& a': {
      'font-weight': 400
    }
  },

  About: {
    'border-top': `1px solid ${theme.color.content.border}`,
    padding: [ theme.grid.stepSize * 3, 0, 0, 0 ],
    'text-align': 'center',

    '& p': {
      margin: 0
    }
  },

  Copyright: {
    'text-align': 'center',
    padding: 0,

    '& p': {
      margin: 0
    }
  },

  [theme.device.small]: {
    PageFooter: {
      margin: 0,
      'padding-right': theme.grid.stepSize * 1.5
    },

    Copyright: {
      'margin-top': theme.grid.stepSize * 1.5
    }
  }
});

const PageFooter = function ({ classes, activePath, activeVersion }) {
  const editThisPageUrl = `https://github.com/thenativeweb/wolkenkit-documentation/edit/master/lib/docs/${activePath.join('/')}/index.md`;

  return (
    <footer className={ classes.PageFooter }>
      <div className={ classes.About }>
        <Brand.MadeBy size='m' color='light' />
        <p>
          Found a bug? Missing something? Want to contribute? Just <a href={ editThisPageUrl }>edit this page</a>.
        </p>
      </div>
      <div className={ classes.Copyright }>
        <p>
          © Copyright 2016-2018 the native web GmbH. All rights reserved.
        </p>
        <p>
          <a href={ `/${activeVersion}/legal/imprint/` }>Imprint</a>
        </p>
      </div>
    </footer>
  );
};

PageFooter.propTypes = {
  activePath: PropTypes.array.isRequired,
  activeVersion: PropTypes.string.isRequired
};

module.exports = injectSheet(styles)(PageFooter);
