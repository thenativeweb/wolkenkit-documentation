'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Icon = require('./Icon.jsx');

const PageFooter = function (props) {
  const { version } = props;
  const editThisPageUrl = `https://github.com/thenativeweb/wolkenkit-documentation/edit/master/lib/docs/${props.history.location.pathname.substr(1)}index.md`;

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
          <a href={ `/${version}/legal/imprint/` }>Imprint</a>
        </p>
      </div>
    </footer>
  );
};

PageFooter.propTypes = {
  history: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired
};

module.exports = PageFooter;
