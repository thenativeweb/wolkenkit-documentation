'use strict';

const roboter = require('roboter');

roboter.
  workOn('server').
  equipWith(task => {
    task('universal/analyze', {
      src: [ '**/*.js', '!node_modules/**/*.js', '!build/**/*.js', '!coverage/**/*.js', '!**/_*/**/*.js' ]
    });

    task('universal/shell', {
      build: 'docker build -t thenativeweb/wolkenkit-documentation .',
      links: 'FLASCHENPOST_FORMATTER=human FORCE_COLOR=true node ./helpers/check-links.js'
    });

    task('universal/license', {
      compatible: [
        // Individual licenses
        'Apache-2.0', 'Apache-2.0*',
        'BSD-2-Clause', 'BSD-3-Clause',
        'CC-BY-4.0',
        'ISC',
        'MIT', 'MIT/X11', 'MIT*',
        'MIT Licensed. http://www.opensource.org/licenses/mit-license.php',
        'Public Domain',
        'Unlicense',
        'WTFPL',

        // Combined licenses
        'BSD-3-Clause OR MIT',
        '(GPL-2.0 OR MIT)',
        '(MIT AND CC-BY-3.0)',
        '(WTFPL OR MIT)'
      ],

      ignore: {
        // WTFPL, see https://github.com/davidchambers/Base64.js/blob/0.2.1/package.json
        Base64: '0.2.1',

        // BSD-4-Clause, covered by a legal notice.
        'bcrypt-pbkdf': '1.0.0',

        // MIT, see https://github.com/veged/coa/blob/v1.0.4/package.json
        coa: '1.0.4',

        // BSD-3-Clause, see https://github.com/fb55/css-select/blob/v1.2.0/LICENSE
        'css-select': '1.2.0',

        // BSD-3-Clause, see https://github.com/fb55/css-what/blob/v2.1.0/LICENSE
        'css-what': '2.1.0',

        // BSD-3-Clause, see https://github.com/deoxxa/duplexer2/blob/0.0.2/LICENSE.md
        duplexer2: '0.0.2',

        // BSD-3-Clause, see https://github.com/fb55/entities/blob/v1.1.1/LICENSE
        entities: '1.1.1',

        // BSD-3-Clause, see https://github.com/estools/esquery/blob/v1.0.0/license.txt
        esquery: '1.0.0',

        // BSD-3-Clause, see https://github.com/JedWatson/exenv/blob/v1.2.1/LICENSE
        exenv: '1.2.1',

        // MIT, see https://github.com/mklabs/node-fileset/blob/v0.2.1/LICENSE-MIT
        fileset: '0.2.1',

        // MIT, see https://github.com/tarruda/has/blob/1.0.1/LICENSE-MIT
        has: '1.0.1',

        // BSD-3-Clause, see https://github.com/dankogai/js-base64/blob/2.1.9/LICENSE.md
        'js-base64': '2.1.9',

        // MIT, see https://github.com/andyperlitch/jsbn/blob/v0.1.0/LICENSE
        jsbn: '0.1.0',

        // BSD-3-Clause OR AFL-2.1, see https://github.com/kriszyp/json-schema/blob/v0.2.3/README.md
        'json-schema': '0.2.3',

        // BSD-3-Clause, see https://github.com/fb55/nth-check/blob/0ff98a60512e466c5d226c550b06eaa74eb26ced/LICENSE
        // (1.0.1 did only specify BSD, the concrete license was then added two commits later)
        'nth-check': '1.0.1',

        // MIT, see https://github.com/stevenvachon/nopter/blob/bb0478aa64b6a1a156c28cfc51e94788617d6c0f/package.json
        nopter: '0.3.0',

        // BSD-2-Clause, see https://github.com/facebook/regenerator/blob/85c9e43331576be96e5dcc61757995397ab15b77/LICENSE
        'regenerator-transform': '0.9.11',

        // BSD-2-Clause, see https://github.com/jviereck/regjsparser/blob/0.1.5/LICENSE.BSD
        regjsparser: '0.1.5',

        // BSD-3-Clause, see https://github.com/crypto-browserify/ripemd160/blob/0.2.1/package.json
        // (0.2.0 didn't have any license, it was then added in 0.2.1)
        ripemd160: '0.2.0',

        // BSD-3-Clause, see https://github.com/ForbesLindesay/win-spawn/commit/ed82eaa11a0291937ff42b38bddab16f6de815e3
        // (https://www.npmjs.com/package/win-fork points to win-spawn)
        'win-fork': '1.1.1',

        // MIT, see https://github.com/eugeneware/unique-stream/blob/v1.0.0/LICENSE
        'unique-stream': '1.0.0'
      }
    });
  }).
  start();
