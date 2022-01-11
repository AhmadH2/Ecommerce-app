const router = require('express').Router();
const marklogic = require('marklogic');
const my = require('../my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;

// Get all Categories list
router.get('/', (req, res) => {
  db.documents
    .query(
      qb
        .where(qb.collection('fashion'))
        .calculate(qb.facet('masterCatName'))
        .withOptions({ categories: 'none' })
    )
    .result(
      function (results) {
        res.send(results[0].facets.masterCatName.facetValues);
        // res.send(results)
      },
      function (error) {
        res.send(error);
      }
    );
});

// Get all subCategories list
router.get('/subcats', (req, res) => {
  db.documents
    .query(
      qb
        .where(qb.collection('fashion'))
        .calculate(qb.facet('subCatName'))
        .withOptions({ categories: 'none' })
    )
    .result(
      function (results) {
        res.send(results[0].facets.subCatName.facetValues);
        // res.send(results)
      },
      function (error) {
        res.send(error);
      }
    );
});

// Returns list of subCategories of a masterCategory
router.get('/:master/subcats', (req, res) => {
  db.documents
    .query(qb.where(qb.and(qb.collection('category'), qb.term(req.params.master))).slice(0,20))
    .result(
      function (results) {
        res.send(results.map((res) => res.content.subCatName));
      },
      function (error) {
        res.send(error);
      }
    );
});

module.exports = router;