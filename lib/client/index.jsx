'use strict';

/* eslint-disable no-unused-vars */
const createHistory = require('history').createBrowserHistory,
      React = require('react'),
      ReactDom = require('react-dom');
/* eslint-enable no-unused-vars */

// Polyfills for IE11.
require('es6-object-assign/auto');
require('array.prototype.find').shim();

const metadata = require('../docs/metadata'),
      page = require('../services/page');

const Docs = require('../components/Docs.jsx');

const history = createHistory();

let activePath = history.location.pathname.split('/').filter(item => item);
let activeVersion = page.getVersion(activePath);

if (!activeVersion) {
  activeVersion = metadata.stable;
  activePath = [ activeVersion ];
  history.replace(`/${activeVersion}/`);
}

page.load({
  path: activePath
}, (err, loadedPage) => {
  if (err) {
    return;
  }

  ReactDom.hydrate(
    <Docs
      activePath={ activePath }
      history={ history }
      pageContent={ loadedPage.content }
      pageInfo={ loadedPage.info }
      metadata={ metadata }
    />,
    global.document.querySelector('#root')
  );
});
