'use strict';

const metadata = require('../../docs/metadata');

const renderRobots = function () {
  return function (req, res) {
    res.writeHead(200, {
      'content-type': 'text/plain'
    });
    res.write(`User-agent: *
Allow: /

Sitemap: ${metadata.baseUrl}/sitemap.txt`);
    res.end();
  };
};

module.exports = renderRobots;
