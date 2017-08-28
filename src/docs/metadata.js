'use strict';

const semver = require('semver');

const slugify = require('../services/slugify');

const versions = [
  'latest',
  '1.1.0',
  '1.0.1',
  '1.0.0'
];

const metadata = {};

metadata.name = 'wolkenkit Documentation';
metadata.baseUrl = 'https://docs.wolkenkit.io';
metadata.navigation = {};
metadata.versions = {};

/* eslint-disable global-require */
versions.forEach(version => {
  const metadataForVersion = require(`./${version}/metadata`);

  metadata.navigation[version] = slugify(metadataForVersion.navigation);
  metadata.versions[version] = metadataForVersion.versions;
});
/* eslint-enable global-require */

metadata.stable = semver.maxSatisfying(versions.filter(version => version !== 'latest'), '*') || 'latest';

module.exports = metadata;
