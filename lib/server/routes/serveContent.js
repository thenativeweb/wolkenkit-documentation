'use strict';

const path = require('path');

const express = require('express');

const readMarkdown = require('../readMarkdown');

const serveContent = function () {
  return function (req, res, next) {
    if (!req.url.endsWith('/index.md')) {
      return express.static(path.join(__dirname, '..', '..', 'docs'))(req, res, next);
    }

    const filePath = path.join(__dirname, '..', '..', 'docs', req.url);
    const version = req.url.split('/')[1] || 'latest';

    readMarkdown({ filePath, version }, (err, markdown) => {
      if (err) {
        return res.status(500).end();
      }

      res.send(markdown);
    });
  };
};

module.exports = serveContent;
