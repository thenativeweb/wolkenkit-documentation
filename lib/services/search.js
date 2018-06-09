'use strict';

const request = require('superagent');

const search = {
  query (options, callback) {
    if (!options) {
      throw new Error('Options are missing.');
    }
    if (!callback) {
      throw new Error('Callback is missing.');
    }

    const { query } = options;

    if (!query) {
      throw new Error('Query is missing.');
    }

    request.
      get(`/search/?q=${query}`).
      end((err, response) => {
        if (err) {
          return callback(err);
        }

        callback(null, response.body);
      });
  }
};

module.exports = search;
