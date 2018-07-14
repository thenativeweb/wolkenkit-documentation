'use strict';

const _ = require('lodash'),
      Fuse = require('fuse.js'),
      lunr = require('lunr');

const getDocuments = require('../getDocuments');

let searchIndex;

const createLunrIndex = ({ documents, ref, fields }) => lunr(function () {
  this.ref(ref);
  fields.forEach(field => this.field(field));

  this.metadataWhitelist = [ 'position' ];

  documents.forEach(doc => this.add(doc));
});

const buildIndex = async function ({ documents }) {
  if (!documents) {
    throw new Error('Documents are missing.');
  }

  const index = createLunrIndex({
    documents,
    ref: 'id',
    fields: [ 'content', 'title' ]
  });

  return index;
};

const getSearchableStringForDocument = document => Object.assign({}, document, {
  searchSource: Object.values(document).join('')
});

const getFullTextSearchResults = (documents, query) => {
  const version = 'latest';

  return documents.
    map(getSearchableStringForDocument).
    filter(item => item.searchSource.toLowerCase().includes(query.toLowerCase()) && item.id.startsWith(version)).
    map(resultItem => ({
      ref: resultItem.id,
      score: 1
    }));
};

// Just for the option to play around with fuse.js
const getFullTestSearchResultsWithFuse = (documents, query) => {
  const options = {
    shouldSort: true,
    matchAllTokens: true,
    threshold: 0.0,
    location: 0,
    distance: 1000,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'title',
      'author.firstName'
    ]
  };

  const filteredDocuments = documents.filter(doc => doc.id.startsWith('latest'));

  const fuse = new Fuse(filteredDocuments, options);

  return fuse.search(query).
    map(resultItem => ({
      ref: resultItem.id,
      score: 1
    }));
};

const search = function () {
  return async function (req, res) {
    const query = req.query.q;
    const documents = await getDocuments();

    if (!searchIndex) {
      searchIndex = await buildIndex({ documents });
    }

    const version = 'latest';

    const lunrSearchResults = searchIndex.search(query).
      filter(item => item.ref.startsWith(version) && item.score > 0.2);

    const orderedLunrSearchResults = _.orderBy(lunrSearchResults, 'score', 'desc');
    const fullTextSearchResults = getFullTextSearchResults(documents, query);

    // Just for the option to play around with fuse.js
    // const fullTextSearchResults = getFullTestSearchResultsWithFuse(documents, query);

    const result = fullTextSearchResults.length ? fullTextSearchResults : orderedLunrSearchResults;

    res.json(result);
    res.end();
  };
};

module.exports = search;
