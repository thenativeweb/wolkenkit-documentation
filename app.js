'use strict';

require('babel-register')();

const fs = require('fs'),
      http = require('http'),
      https = require('https'),
      path = require('path');

const express = require('express'),
      flaschenpost = require('flaschenpost'),
      processenv = require('processenv');

const compile = require('./compile'),
      routes = require('./src/server/routes');

const logger = flaschenpost.getLogger();

const app = express(),
      portHttp = processenv('PORT_HTTP') || 8000,
      portHttps = processenv('PORT_HTTPS') || 9000;

app.use('/robots.txt', routes.renderRobots());
app.use('/sitemap.txt', routes.renderSitemap());
app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/', routes.serveClient());
app.use('/', routes.serveContent());
app.get('*', routes.renderPage());

try {
  const keysPath = path.join('/', 'keys', 'local.wolkenkit.io');

  /* eslint-disable no-sync */
  const privateKey = fs.readFileSync(path.join(keysPath, 'privateKey.pem'), { encoding: 'utf8' });
  const certificate = fs.readFileSync(path.join(keysPath, 'certificate.pem'), { encoding: 'utf8' });
  /* eslint-enable no-sync */

  https.createServer({ key: privateKey, cert: certificate }, app).listen(portHttps, () => {
    logger.info('Documentation server started.', { port: portHttps });
  });

  const appHttp = express();

  appHttp.get(/.*/, (req, res) => {
    res.writeHead(301, {
      location: `https://${req.headers.host}${req.url}`
    });
    res.end();
  });

  http.createServer(appHttp).listen(portHttp, () => {
    logger.info('Documentation server started.', { port: portHttp });
  });
} catch (ex) {
  logger.warn('Failed to load SSL keys, falling back to HTTP.');

  compile(err => {
    if (err) {
      /* eslint-disable no-process-exit */
      process.exit(1);
      /* eslint-enable no-process-exit */
    }

    http.createServer(app).listen(portHttp, () => {
      logger.info('Documentation server started.', { port: portHttp });
    });
  });
}
