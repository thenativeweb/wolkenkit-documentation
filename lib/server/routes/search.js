'use strict';

const lunr = require('lunr');

const getDocuments = require('../getDocuments');

let searchIndex;

const createLunrIndex = ({ documents, ref, fields }) => lunr(function () {
  this.ref(ref);
  fields.forEach(field => this.field(field));
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

const search = function () {
  return async function (req, res) {
    const query = req.query.q;
    const documents = await getDocuments();

    if (!searchIndex) {
      searchIndex = await buildIndex({ documents });
    }

    const result = searchIndex.search(query);

    res.json(result);
    res.end();
  };
};

module.exports = search;
