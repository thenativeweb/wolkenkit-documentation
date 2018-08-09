'use strict';

const slugify = function (text) {
  if (typeof text === 'string') {
    return text.toLowerCase().replace(/ /g, '-').
      replace(/[^A-Za-z0-9-]/g, '');
  }

  if (Array.isArray(text)) {
    const items = text;

    return items.map(item => {
      if (item.children) {
        return { title: item.title, slug: slugify(item.title), children: slugify(item.children), keywords: item.keywords };
      }

      return { title: item.title, slug: slugify(item.title), keywords: item.keywords };
    });
  }

  throw new Error('Invalid operation.');
};

module.exports = slugify;
