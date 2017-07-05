'use strict';

const path = require('path');

const { Helmet } = require('react-helmet'),
      processenv = require('processenv');

const readMarkdown = require('../readMarkdown'),
      render = require('../render.jsx');

const isProductionMode = processenv('NODE_ENV') === 'production';

const renderPage = function () {
  return function (req, res) {
    const filePath = path.join(__dirname, '..', '..', 'docs', req.url, 'index.md'),
          version = req.url.split('/')[1] || 'latest';

    readMarkdown({ filePath, version }, (err, markdown) => {
      if (err) {
        return res.status(500).end();
      }

      const html = render({
        pageContent: markdown,
        url: req.url.substr(1)
      });

      const head = Helmet.renderStatic();

      let gaCode = '';

      if (isProductionMode) {
        // Because this code is made public, we need to keep the spaces to make it look good.
        gaCode = `<script>
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

              ga('create', 'UA-36681683-5', 'auto');
              ga('send', 'pageview');
            </script>`;
      }

      res.send(`<!doctype html>
        <html>
          <head>
            <meta charset="utf8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            ${head.title}
            <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32">
            <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700|Ubuntu:300,400,500|Ubuntu+Mono|Kalam" rel="stylesheet">
            <link rel="stylesheet" type="text/css" href="/wk-docs.css">
          </head>

          <body>
            <div id="root">${html}</div>

            <script type="text/javascript" src="/wk-docs.js"></script>
            ${gaCode}
          </body>
        </html>`
      );
    });
  };
};

module.exports = renderPage;
