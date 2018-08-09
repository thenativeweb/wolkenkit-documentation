'use strict';

const path = require('path'),
      util = require('util');

const metadata = require('../docs/metadata'),
      readMarkdownCallback = require('./readMarkdown');

const readMarkdown = util.promisify(readMarkdownCallback);

let documents;

const collectDocuments = function ({ from, parent, into, version } = {}) {
  if (!from) {
    throw new Error('From is missing.');
  }
  if (!parent) {
    throw new Error('Parent is missing.');
  }
  if (!into) {
    throw new Error('Into is missing.');
  }
  if (!version) {
    throw new Error('Version is missing.');
  }

  from.forEach(item => {
    if (item.children) {
      return collectDocuments({
        from: item.children,
        parent: path.join(parent, item.slug),
        into,
        version
      });
    }
    if (!item.slug) {
      return;
    }

    const filePath = path.join(parent, item.slug, 'index.md');

    const doc = {
      id: filePath,
      filePath,
      title: item.title,
      version
    };

    into.push(doc);
  });
};

const getDocuments = async function () {
  if (documents) {
    return documents;
  }

  documents = [];

  Object.keys(metadata.navigation).forEach(version => {
    collectDocuments({
      from: metadata.navigation[version],
      parent: version,
      into: documents,
      version
    });
  });

  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];

    const content = await readMarkdown({ version: 'latest', filePath: path.join(__dirname, '..', 'docs', document.filePath) });

    document.content = content;
  }

  return documents;
};

module.exports = getDocuments;
