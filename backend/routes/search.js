const router = require('express').Router();
const marklogic = require('marklogic');
const my = require('../my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;

// Query for products
router.get('/', (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page)*10;
   db.documents
     .query(
       qb
         .where(
           qb.parsedFrom(
             query,
             qb.parseBindings(
               qb.value('brandName', qb.bind('brand')),
               qb.value('gender', qb.bind('gender')),
               qb.value('baseColour', qb.bind('colour')),
               qb.value('season', qb.bind('season')),
               qb.range('typeName', qb.bind('category'))
             )
           )
         )
         .slice(page-10,page)
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

router.get('/offers', (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) * 10;

  db.documents
    .query(qb.where(qb.word('text', 'off')).slice(page - 10, page))
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

router.get('/discount', (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) * 10;
  db.documents
    .query(
      qb
        .where(
          qb.parsedFrom(
            query,
            qb.parseBindings(
              qb.value('brandName', qb.bind('brand')),
              qb.value('gender', qb.bind('gender')),
              qb.value('baseColour', qb.bind('colour')),
              qb.value('season', qb.bind('season')),
              qb.range('typeName', qb.bind('category'))
            )
          )
        )
        .slice(0, 20)
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

// Get Similar products
router.get('/:typeName', (req, res) => {
  const page = parseInt(req.query.page) * 10;
  let filter = req.query.f;
  filter = filter.replace('men women', 'unisex')
  const typeName = req.params.typeName;
  const term = typeName +'::'+ filter
  console.log('typeName: '+typeName)
  console.log('term:', term)
  db.documents
    .query(
      qb.where(
        qb.parsedFrom(
          term,
          qb.parseBindings(
            qb.range(
              'discountPercent',
              qb.datatype('int'),
              qb.bind('discount')
            ),
            qb.value('brandName', qb.bind('brand')),
            qb.value('gender', qb.bind('gender')),
            qb.value('baseColour', qb.bind('colour')),
            qb.value('typeName', qb.bindDefault())
          )
        )
      )
    )
    .result(function (documents) {
      let ds = documents.map((rec) => {
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
      res.json(ds);
    }); 
});


router.get('/suggest/:title', (req, res) => {
  const term = req.params.title;

  db.documents
    .suggest(
      term,
      qb.where(
        qb.parsedFrom(
          '',
          qb.parseBindings(
            // qb.range('productDisplayName', qb.bind('title')),
            qb.range('typeName', qb.bindDefault())
          )
        )
      )
    )
    .result((response) => {
      const sug = response.map((d)=> {
        if (d.indexOf('\"') != -1)
        return d.substring(d.indexOf('\"')+1, d.lastIndexOf('"'));
        else return d
      })
      res.send(sug);
    });
})

module.exports = router;