const router = require('express').Router();
const marklogic = require('marklogic');
const my = require('../my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;
const vb = marklogic.valuesBuilder;

// Get all Categories list
router.get('/', (req, res) => {
  // db.documents
  //   .query(
  //     qb
  //       .where(qb.collection('fashion'))
  //       .calculate(qb.facet('masterCatName'))
  //       .withOptions({ categories: 'none' })
  //   )
  db.values.read(
    vb.fromIndexes('masterCatName')
  )
    .result(
      function (results) {
        const cats = results['values-response'].tuple.map((r) => r['distinct-value'][0])
        
        res.send(cats)
      },
      function (error) {
        res.send(error);
      }
    );
});

// Get all articles type for sub Category
router.get('/articles', (req, res) => {
  const name = req.query.name;
  db.values
    .read(
      vb
        .fromIndexes('typeName')
        .where(vb.collection(name))
        .slice(0, 190)
        .withOptions({ values: ['ascending'] })
    )
    .result(
      function (results) {
        // res.send(results[0].facets.typeName.facetValues);
        const s = results['values-response'].tuple
          .map((obj) => obj['distinct-value'][0])
          .filter((n) => n !== name);
        res.send(
         s
        );
      },
      function (error) {
        res.send(error);
      }
    );
});

router.get('/articles/:name', (req, res) => {
  const name = req.params.name;
  db.documents
    .query(
      qb.where(qb.parsedFrom(name, 
        qb.parseBindings(
          // qb.value('prefix', qb.bind('prefix')),
          qb.range('typeName', qb.bindDefault())
        ))
      )
    )
    .result(
      function (results) {
        // res.send(results[0].facets.typeName.facetValues);
        res.send(results);
      },
      function (error) {
        res.send(error);
      }
    );
});

// Get all subCategories list
// router.get('/subcats', (req, res) => {
//   db.documents
//     .query(
//       qb
//         .where(qb.collection('fashion'))
//         .calculate(qb.facet('subCatName'))
//         .withOptions({ categories: 'none' })
//     )
//     .result(
//       function (results) {
//         res.send(results[0].facets.subCatName.facetValues);
//         // res.send(results)
//       },
//       function (error) {
//         res.send(error);
//       }
//     );
// });

// Returns list of subCategories of a masterCategory
router.get('/subcats', (req, res) => {
  const category = req.query.category;
  db.documents
    .query(
      qb
        .where(qb.and(qb.collection('category'), qb.term(category)))
        .slice(0, 20)
    )
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