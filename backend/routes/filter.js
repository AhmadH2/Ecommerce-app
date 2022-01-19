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

router.get('/discount', (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) * 20;

  db.documents
    .query(
      qb
        .where(
          // qb.word('text', 'off')
          qb.parsedFrom(
            query,
            qb.parseBindings(
              qb.word('text', qb.bind('off')),
              // qb.value('gender', qb.bind('gender')),
              // qb.value('baseColour', qb.bind('colour')),
              // qb.value('season', qb.bind('season')),
              qb.word('typeName', qb.bind('cat'))
            )
          )
        )
        .slice(page - 20, page)
    )
    .result(
      function (documents) {
        const data = documents.map((rec) => {
          return {
            id: rec.content.data.id,
            title: rec.content.data.hasOwnProperty('productDisplayName')
              ? rec.content.data.productDisplayName
              : 'Unknown',
            price: rec.content.data.hasOwnProperty('price')
              ? rec.content.data.price / 100.0
              : 'Unknown',
            discountedPrice: rec.content.data.discountedPrice / 100.0,
            image: rec.content.data.styleImages.search.resolutions['180X240'],
            masterCategory: rec.content.data.masterCategory.typeName,
            subCategory: rec.content.data.subCategory.typeName,
            article: rec.content.data.articleType.typeName,
            // discountPercent: rec.content.data.discountData.discountPercent,
            discountText: rec.content.data.hasOwnProperty('discountData')
              ? rec.content.data.discountData.discountText.text
              : 'Unknown',
          };
        });
        res.json(data);
      },
      function (error) {
        res.send(error);
      }
    );
});

module.exports = router;