'use strict';

const metadata = require('../../docs/metadata');

const collectUrls = function (options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.from) {
    throw new Error('From is missing.');
  }
  if (!options.parent) {
    throw new Error('Parent is missing.');
  }
  if (!options.into) {
    throw new Error('Into is missing.');
  }

  const { from, parent, into } = options;

  from.forEach(item => {
    if (item.children) {
      return collectUrls({ from: item.children, parent: `${parent}/${item.slug}`, into });
    }
    if (!item.slug) {
      return;
    }
    into.push(`${parent}/${item.slug}/`);
  });
};

const renderSitemap = function () {
  return function (req, res) {
    const urls = [];

    Object.keys(metadata.navigation).forEach(version => {
      collectUrls({ from: metadata.navigation[version], parent: version, into: urls });
    });

    res.writeHead(200, {
      'content-type': 'text/plain'
    });
    res.write(urls.
      map(url => `${metadata.baseUrl}/${url}`).
      join('\n'));
    res.end();
  };
};

module.exports = renderSitemap;
