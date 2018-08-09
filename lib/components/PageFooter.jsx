'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Icon = require('./Icon.jsx');

const PageFooter = function ({ activePath, activeVersion }) {
  const editThisPageUrl = `https://github.com/thenativeweb/wolkenkit-documentation/edit/master/lib/docs/${activePath.join('/')}/index.md`;

  return (
    <footer className='wk-page-footer'>
      <div className='about'>
        <p>
          Made with <Icon name='heart' size='small' /> by <a href='https://www.thenativeweb.io'>the native web</a>.
        </p>
        <p>
          Found a bug? Missing something? Want to contribute? Just <a href={ editThisPageUrl }>edit this page</a>.
        </p>
      </div>
      <div className='copyright'>
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

module.exports = PageFooter;
