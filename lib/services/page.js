'use strict';

const request = require('superagent');

const metadata = require('../docs/metadata');

const getPageInfoInternal = function (children, path, breadcrumbs) {
  if (!children) {
    return '';
  }

  const item = children.find(child => child.slug === path[0]);

  if (!item) {
    return '';
  }

  breadcrumbs.push(item.title);

  if (!item.children || path.length === 1) {
    return {
      title: item.title,
      breadcrumbs
    };
  }

  return getPageInfoInternal(item.children, path.slice(1), breadcrumbs);
};

const page = {
  load (options, callback) {
    const { path } = options;
    let pageUrl = `/index.md`;

    if (path.length > 0) {
      pageUrl = `/${path.join('/')}/index.md`;
    }

    request.
      get(pageUrl).
      end((err, response) => {
        if (err) {
          return callback(err);
        }

        callback(null, {
          content: response.text,
          info: page.getInfo(path)
        });
      });
  },

  getInfo (path) {
    const [ version, ...pathWithoutVersion ] = path;

    return getPageInfoInternal(metadata.navigation[version], pathWithoutVersion, []);
  },

  getVersion (path) {
    if (!Array.isArray(path)) {
      throw new Error('Path is not an array.');
    }

    if (path[0]) {
      return path[0];
    }

    return undefined;
  },

  getSection (path) {
    if (!Array.isArray(path)) {
      throw new Error('Path is not an array.');
    }

    if (path[1]) {
      return path[1];
    }

    return undefined;
  },

  getChapter (path) {
    if (!Array.isArray(path)) {
      throw new Error('Path is not an array.');
    }

    if (path[2]) {
      return path[2];
    }

    return undefined;
  },

  isPage (path) {
    const [ version, ...pathWithoutVersion ] = path;

    const pageTree = metadata.navigation[version];
    const pageOrSection = pathWithoutVersion.reduce((acc, partialPath) => acc[partialPath], pageTree);

    return !pageOrSection.children;
  }
};

module.exports = page;
