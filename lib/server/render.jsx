'use strict';

/* eslint-disable no-unused-vars */
const createHistory = require('history').createMemoryHistory,
      React = require('react'),
      ReactDOM = require('react-dom/server'),
      { StyleCollector, ThemeProvider } = require('thenativeweb-ux');
/* eslint-enable no-unused-vars */

const metadata = require('../docs/metadata'),
      page = require('../services/page'),
      theme = require('../theme/docs');

const Docs = require('../screens/Docs.jsx');

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

  const html = ReactDOM.renderToString(
    <StyleCollector>
      <ThemeProvider theme={ theme }>
        <Docs
          activePath={ activePath }
          activeVersion={ activeVersion }
          history={ history }
          pageInfo={ pageInfo }
          pageContent={ pageContent }
          metadata={ metadata }
        />
      </ThemeProvider>
    </StyleCollector>
  );

  return {
    html,
    styles: StyleCollector.getStyles()
  };
};

module.exports = index;
