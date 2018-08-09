'use strict';

const path = require('path');

const metadata = require('../docs/metadata');

const flatPages = {};

const collectPages = function ({ from, into, parent, parentSlug, section, chapter, version } = {}) {
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
    const pagePath = path.join(parentSlug, page.slug);

    if (page.children) {
      const pathDepth = pagePath.match(/\/.+?/g).length;

      if (pathDepth === 1) {
        section = page;
      }
      if (pathDepth === 2) {
        chapter = page;
      }

      return collectPages({
        from: page.children,
        into,
        parent: page,
        parentSlug: path.join(parentSlug, page.slug),
        section,
        chapter,
        version
      });
    }
    if (!page.slug) {
      return;
    }

    const pageMetaData = {
      id: pagePath,
      parent,
      path: pagePath,
      title: page.title,
      keywords: page.keywords,
      keywordsAsString: page.keywords ? page.keywords.join(' ') : undefined,
      section,
      chapter,
      version,
      breadcrumbsAsString: `${section.title} ${chapter && chapter.title}`
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

      collectPages({
        from: metadata.navigation[version],
        parentSlug: version,
        into: flatPages[version],
        version
      });
    }

    const queryWords = query.
      split(' ').
      filter(word => word !== '');

    const patterns = queryWords.map(word => {
      const test = new RegExp(`(\\b${word})`, 'i');

      return test;
    });

    const results = flatPages[version].filter(page => {
      let occurences = 0;

      patterns.forEach(pattern => {
        if (
          pattern.test(page.title) ||
          pattern.test(page.keywordsAsString) ||
          pattern.test(page.breadcrumbsAsString)
        ) {
          occurences += 1;
        }
      });

      return occurences === patterns.length;
    });

    return results;
  }
};

module.exports = pages;
