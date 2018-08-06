'use strict';

const path = require('path');

const metadata = require('../docs/metadata');

const flatPages = {};

const collectPages = function ({ from, into, parent, parentSlug, section, version } = {}) {
  if (!from) {
    throw new Error('From is missing.');
  }
  if (!parentSlug) {
    throw new Error('Parent slug is missing.');
  }
  if (!into) {
    throw new Error('Into is missing.');
  }
  if (!version) {
    throw new Error('Version is missing.');
  }

  from.forEach(item => {
    if (item.children) {
      const slug = path.join(parentSlug, item.slug);
      const pathDepth = slug.match(/\/.+?/g).length;

      if (pathDepth === 1) {
        section = item;
      }

      return collectPages({
        from: item.children,
        into,
        parent: item,
        parentSlug: path.join(parentSlug, item.slug),
        section,
        version
      });
    }
    if (!item.slug) {
      return;
    }

    const pathToItem = path.join(parentSlug, item.slug);

    const doc = {
      id: pathToItem,
      parent,
      path: pathToItem,
      title: item.title,
      titleAsLowerCase: item.title.toLowerCase(),
      section,
      version
    };

    into.push(doc);
  });
};

const pages = {
  search ({ query, version }) {
    if (!query) {
      throw new Error('Query is missing.');
    }
    if (!version) {
      throw new Error('Version is missing.');
    }

    if (!flatPages[version]) {
      flatPages[version] = [];

      collectPages({
        from: metadata.navigation[version],
        parentSlug: version,
        into: flatPages[version],
        version
      });
    }

    const queryWords = query.toLowerCase().
      split(' ').
      filter(word => word !== '');

    const patterns = queryWords.map(word => {
      const test = new RegExp(`(\\b${word})`, 'gim');

      return test;
    });

    const results = flatPages[version].filter(page => {
      let occurences = 0;

      patterns.forEach(pattern => {
        if (pattern.test(page.titleAsLowerCase)) {
          occurences += 1;
        }
      });

      return occurences === patterns.length;
    });

    return results;
  }
};

module.exports = pages;
