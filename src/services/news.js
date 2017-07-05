'use strict';

const request = require('superagent');

const news = {
  load (options, callback) {
    if (!options) {
      throw new Error('Options are missing.');
    }
    if (!callback) {
      throw new Error('Callback is missing.');
    }

    const { url } = options;

    if (!url) {
      throw new Error('Url is missing.');
    }

    request.
      get(`${url}?_=${Date.now()}`).
      end((err, response) => {
        if (err) {
          return callback(err);
        }

        callback(null, response.body);
      });
  }
};

module.exports = news;
