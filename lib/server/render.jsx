'use strict';

const createHistory = require('history').createMemoryHistory,
      React = require('react'),
      ReactDOM = require('react-dom/server'),
      { StyleCollector, ThemeProvider } = require('thenativeweb-ux');

const metadata = require('../docs/metadata'),
      page = require('../services/page'),
      theme = require('../theme/docs');

const Docs = require('../screens/Docs.jsx');

const stylesForUrl = {};

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

  if (!stylesForUrl[url]) {
    stylesForUrl[url] = StyleCollector.createCollection();

    const html = ReactDOM.renderToString(
      <StyleCollector collection={ stylesForUrl[url] }>
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
      styles: stylesForUrl[url].toString()
    };
  }

  const html = ReactDOM.renderToString(
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
  );

  return {
    html,
    styles: stylesForUrl[url].toString()
  };
};

module.exports = index;
