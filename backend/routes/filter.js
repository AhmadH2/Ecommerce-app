const router = require('express').Router();
const marklogic = require('marklogic');
const my = require('../my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;
const vb = marklogic.valuesBuilder;

router.get('/brand', (req, res) => {
  const category = req.query.category;
  db.values
    .read(
      vb
        .fromIndexes('brandName')
        .where(
          qb.parsedFrom(
            category,
            qb.parseBindings(
              qb.value('typeName', qb.bindDefault())
            )// equal to typeName:name
          )
        )
        .withOptions({ values: ['frequency-order'] })
    )
    .result(
      function (results) {
        const brands = results['values-response'].tuple.map(
          (b) => b['distinct-value'][0]
        );

        res.send(brands);
      },
      function (error) {
        res.send(error);
      }
    );
});

router.get('/gender', (req, res) => {
  const category = req.query.category;
  db.values
    .read(
      vb
        .fromIndexes('gender')
        .where(
          qb.parsedFrom(
            category,
            qb.parseBindings(qb.value('typeName', qb.bindDefault())) // equal to typeName:name
          )
        )
        .withOptions({ values: ['frequency-order'] })
    )
    .result(
      (results) => {
        const gender = results['values-response'].tuple.map(
          (g) => g['distinct-value'][0]
        );
        res.send(gender);
      },
      (error) => {
        res.send(error);
      }
    );
});

router.get('/colour', (req, res) => {
  const category = req.query.category;
  db.values
    .read(
      vb
        .fromIndexes('baseColour')
        .where(
          qb.parsedFrom(
            category,
            qb.parseBindings(qb.value('typeName', qb.bindDefault())) // equal to typeName:name
          )
        )
        .withOptions({ values: ['frequency-order'] })
    )
    .result(
      (results) => {
        const gender = results['values-response'].tuple.map(
          (g) => g['distinct-value'][0]
        );
        res.send(gender);
      },
      (error) => {
        res.send(error);
      }
    );
});

router.get('/season', (req, res) => {
  const category = req.query.category;
  db.values
    .read(
      vb
        .fromIndexes('season')
        .where(
          qb.parsedFrom(
            category,
            qb.parseBindings(qb.value('typeName', qb.bindDefault())) // equal to typeName:name
          )
        )
        .withOptions({ values: ['frequency-order'] })
    )
    .result(
      (results) => {
        const gender = results['values-response'].tuple.map(
          (g) => g['distinct-value'][0]
        );
        res.send(gender);
      },
      (error) => {
        res.send(error);
      }
    );
});


module.exports = router;