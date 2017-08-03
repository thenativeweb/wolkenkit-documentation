'use strict';

require('babel-register')();

const path = require('path');

const express = require('express'),
      flaschenpost = require('flaschenpost'),
      httpsOrHttp = require('https-or-http'),
      processenv = require('processenv');

const compile = require('./compile'),
      routes = require('./src/server/routes');

const logger = flaschenpost.getLogger();

const app = express(),
      certificateDirectory = path.join('/', 'keys', 'local.wolkenkit.io'),
      portHttp = processenv('PORT_HTTP') || 8000,
      portHttps = processenv('PORT_HTTPS') || 9000;

app.use('/robots.txt', routes.renderRobots());
app.use('/sitemap.txt', routes.renderSitemap());
app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/', routes.serveClient());
app.use('/', routes.serveContent());
app.get('*', routes.renderPage());

httpsOrHttp({
  app,
  certificateDirectory,
  ports: {
    http: portHttp,
    https: portHttps
  }
}, (err, servers) => {
  if (err) {
    logger.error(err.message, err);

    return;
  }

  logger.info('Documentation server started.', { protocol: servers.app.protocol, port: servers.app.port });

  if (servers.app.protocol === 'http') {
    compile(errCompile => {
      if (errCompile) {
        /* eslint-disable no-process-exit */
        process.exit(1);
        /* eslint-enable no-process-exit */
      }
    });
  }

  if (servers.redirect) {
    logger.info('Redirect server started.', { protocol: servers.redirect.protocol, port: servers.redirect.port });
  }
});
