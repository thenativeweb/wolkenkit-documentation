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

  from.forEach(page => {
    if (page.children) {
      const slug = path.join(parentSlug, page.slug);
      const pathDepth = slug.match(/\/.+?/g).length;

      if (pathDepth === 1) {
        section = page;
      }

      return collectPages({
        from: page.children,
        into,
        parent: page,
        parentSlug: path.join(parentSlug, page.slug),
        section,
        version
      });
    }
    if (!page.slug) {
      return;
    }

    const pathToItem = path.join(parentSlug, page.slug);

    const pageMetaData = {
      id: pathToItem,
      parent,
      path: pathToItem,
      title: page.title,
      titleAsLowerCase: page.title.toLowerCase(),
      keywords: page.keywords,
      section,
      version
    };

    into.push(pageMetaData);
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

      console.log(metadata.navigation[version], version);

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
      const test = new RegExp(`(\\b${word})`, 'i');

      return test;
    });

    const results = flatPages[version].filter(page => {
      let occurences = 0;

      patterns.forEach(pattern => {
        if (pattern.test(page.titleAsLowerCase) || pattern.test(page.keywords)) {
          occurences += 1;
        }
      });

      return occurences === patterns.length;
    });

    return results;
  }
};

module.exports = pages;
