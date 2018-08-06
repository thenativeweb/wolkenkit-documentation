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
    const queryAsLowerCase = query.toLowerCase();

    if (!flatPages[version]) {
      flatPages[version] = [];

      collectPages({
        from: metadata.navigation[version],
        parentSlug: version,
        into: flatPages[version],
        version
      });
    }

    const results = flatPages[version].filter(page => page.titleAsLowerCase.includes(queryAsLowerCase) &&
      page.path.includes(queryAsLowerCase));

    return results;
  }
};

module.exports = pages;
