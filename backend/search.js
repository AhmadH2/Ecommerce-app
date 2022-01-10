// Search for documents about mammals, using Query By Example.
// The query returns an array of document descriptors, one per
// matching document. The descriptor includes the URI and the
// contents of each document.

const marklogic = require('marklogic');
const my = require('./my-connection.js');

const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;

db.documents.query(qb.where(qb.byExample({ baseColour: 'Black' }))).result(
  function (documents) {
    console.log('Matches for kind=mammal:');
    documents.forEach(function (document) {
      console.log('\nURI: ' + document.uri);
      console.log('Name: ' + document.content.data.baseColour);
    });
  },
  function (error) {
    console.log(JSON.stringify(error, null, 2));
  }
);

// db.documents
//     .query(qb.where(qb.and(qb.collection("category"), qb.byExample({masterCatName: req.params.master}))))
//     .result(