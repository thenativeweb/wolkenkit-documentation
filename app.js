'use strict';

require('@babel/register')();

const http = require('http'),
      path = require('path');

const compression = require('compression'),
      express = require('express'),
      flaschenpost = require('flaschenpost');

const compile = require('./compile'),
      routes = require('./lib/server/routes');

const logger = flaschenpost.getLogger();

const app = express(),
      port = 8000;

app.use(compression());
app.use('/robots.txt', routes.renderRobots());
app.use('/sitemap.txt', routes.renderSitemap());
app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/', routes.serveClient());
app.use('/', routes.serveContent());
app.get('*', routes.renderPage());

compile(err => {
  if (err) {
    /* eslint-disable no-process-exit */
    logger.error('Compilation failed.', { err });
    process.exit(1);
    /* eslint-enable no-process-exit */
  }

  const server = http.createServer(app);

  server.listen(port, () => {
    logger.info('Server started.');
  });
});
