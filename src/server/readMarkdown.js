'use strict';

const fs = require('fs');

const ejs = require('ejs');

const metadata = require('../docs/metadata');

const readMarkdown = function (options, callback) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.filePath) {
    throw new Error('File path is missing.');
  }
  if (!options.version) {
    throw new Error('Version is missing.');
  }

  const { filePath, version } = options;

  fs.stat(filePath, errStat => {
    if (errStat) {
      return callback(errStat);
    }

    fs.readFile(filePath, 'utf8', (errReadFile, markdownWithEjs) => {
      if (errReadFile) {
        return callback(errReadFile);
      }

      const markdown = ejs.render(markdownWithEjs, {
        current: {
          version,
          versions: metadata.versions[version]
        },
        filename: filePath
      });

      callback(null, markdown);
    });
  });
};

module.exports = readMarkdown;
