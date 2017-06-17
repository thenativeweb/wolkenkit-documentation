'use strict';

/* globals window */

/* eslint-disable no-unused-vars */
const createHistory = require('history').createBrowserHistory,
      React = require('react'),
      ReactDom = require('react-dom');
/* eslint-enable no-unused-vars */

// Since cookieconsent returns an empty object, we have to require its built
// file directly.
require('cookieconsent/build/cookieconsent.min.js');

const metadata = require('../docs/metadata'),
      page = require('../services/page');

const Docs = require('../components/Docs.jsx');

const handle = {
  windowLoaded () {
    window.cookieconsent.initialise({});
  }
};

window.addEventListener('load', handle.windowLoaded);

const history = createHistory();

let activePath = history.location.pathname.split('/').filter(item => item);
let activeVersion = page.getVersion(activePath);

if (!activeVersion) {
  activeVersion = metadata.stable;
  activePath = [ activeVersion ];
  history.push(`/${activeVersion}/`);
}

page.load({
  path: activePath
}, (err, loadedPage) => {
  if (err) {
    return;
  }

  ReactDom.render(
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
