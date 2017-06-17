'use strict';

/* eslint-disable no-unused-vars */
const createHistory = require('history').createMemoryHistory,
      React = require('react'),
      ReactDOM = require('react-dom/server');
/* eslint-enable no-unused-vars */

const metadata = require('../docs/metadata.js'),
      page = require('../services/page.js');

const Docs = require('../components/Docs.jsx');

const index = function (options) {
  const { pageContent, url } = options;

  const history = createHistory();

  history.push(url);

  let activePath = history.location.pathname.split('/').filter(item => item);
  let activeVersion = page.getVersion(activePath);

  if (!activeVersion) {
    activeVersion = metadata.stable;
    activePath = [ activeVersion ];
    history.push(`/${activeVersion}/`);
  }

  const pageInfo = page.getInfo(activePath);

  return ReactDOM.renderToString(
    <Docs
      activePath={ activePath }
      history={ history }
      pageInfo={ pageInfo }
      pageContent={ pageContent }
      metadata={ metadata }
    />
  );
};

module.exports = index;
