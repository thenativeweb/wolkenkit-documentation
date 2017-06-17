'use strict';

/* eslint-disable no-process-env */
process.env.NODE_ENV = 'production';
/* eslint-enable no-process-env */

const compile = require('../compile');

compile(err => {
  /* eslint-disable no-process-exit */
  process.exit(err ? 1 : 0);
  /* eslint-enable no-process-exit */
});
