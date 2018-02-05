'use strict';

/* globals window */

/* eslint-disable no-unused-vars */
const createHistory = require('history').createBrowserHistory,
      React = require('react'),
      ReactDom = require('react-dom');
/* eslint-enable no-unused-vars */

// Polyfill for Object.assign for IE11.
require('es6-object-assign/auto');

// Since cookieconsent returns an empty object, we have to require its built
// file directly.
require('cookieconsent/build/cookieconsent.min.js');

const metadata = require('../docs/metadata'),
      page = require('../services/page');

const Docs = require('../components/Docs.jsx');

const dom = {
  nav: window.document.querySelector('.wk-navigation')
};

const handle = {
  windowLoaded () {
    window.cookieconsent.initialise({});
  },

  navClicked (event) {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'a') {
      handle.navLinkClicked(event);
    }
  },

  navLinkClicked (event) {
    if (!window.ga) {
      return;
    }

    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Navigation',
      eventAction: 'click',
      eventLabel: event.target.href,
      transport: 'beacon'
    });
  }
};

window.addEventListener('load', handle.windowLoaded);

dom.nav.addEventListener('click', handle.navClicked);

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
