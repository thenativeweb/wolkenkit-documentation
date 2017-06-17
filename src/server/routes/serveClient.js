'use strict';

const path = require('path');

const express = require('express');

const serveClient = function () {
  return express.static(path.join(__dirname, '..', '..', '..', 'build'));
};

module.exports = serveClient;
