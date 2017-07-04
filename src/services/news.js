'use strict';

const request = require('superagent');

const news = {
  load (options, callback) {
    const { url } = options;

    if (!url) {
      throw new Error('Url is missing.');
    }

    request.
      get(url).
      end((err, response) => {
        if (err) {
          return callback(err);
        }

        callback(null, response.body);
      });
  }
};

module.exports = news;
