'use strict';

const createHistory = require('history').createBrowserHistory,
      React = require('react'),
      ReactDom = require('react-dom'),
      { ThemeProvider } = require('thenativeweb-ux');

const theme = require('../theme/docs');

// Polyfills for IE11.
require('es6-object-assign/auto');
require('array.prototype.find').shim();

const metadata = require('../docs/metadata'),
      page = require('../services/page');

const Docs = require('../screens/Docs.jsx');

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
    <ThemeProvider theme={ theme }>
      <Docs
        suppressHydrationWarning={ true }
        activePath={ activePath }
        activeVersion={ activeVersion }
        history={ history }
        pageContent={ loadedPage.content }
        pageInfo={ loadedPage.info }
        metadata={ metadata }
      />
    </ThemeProvider>
    ,
    global.document.querySelector('#root'),
    () => {
      // We don't need the static css any more once we have launched our application.
      const styles = global.document.getElementById('server-side-styles');

      if (styles) {
        styles.parentNode.removeChild(styles);
      }
    }
  );
});
