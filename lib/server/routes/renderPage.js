'use strict';

const path = require('path');

const { Helmet } = require('react-helmet');

const readMarkdown = require('../readMarkdown'),
      render = require('../render.jsx');

const renderPage = function () {
  return function (req, res) {
    const filePath = path.join(__dirname, '..', '..', 'docs', req.url, 'index.md'),
          version = req.url.split('/')[1] || 'latest';

    readMarkdown({ filePath, version }, (err, markdown) => {
      if (err) {
        return res.status(500).end();
      }

      const rendered = render({
        pageContent: markdown,
        url: req.url.substr(1)
      });

      const head = Helmet.renderStatic();

      // ${ rendered.html }

      res.send(`<!doctype html>
        <html>
          <head>
            <meta charset="utf8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            ${head.title}
            <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32">
            <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700|Ubuntu:300,400,500|Ubuntu+Mono|Kalam" rel="stylesheet">
            <link rel="stylesheet" type="text/css" href="/wk-docs.css">
            <style type='text/css' id='server-side-styles'>
              ${rendered.styles}
            </style>
          </head>

          <body>
            <div id="root"></div>

            <script type="text/javascript" src="/wk-docs.js"></script>
          </body>
        </html>`);
    });
  };
};

module.exports = renderPage;
