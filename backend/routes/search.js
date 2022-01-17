const router = require('express').Router();
const marklogic = require('marklogic');
const my = require('../my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;

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
               qb.value('typeName', qb.bindDefault())
             )
           )
         )
         .slice(page - 10, page)
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
             image: rec.content.data.styleImages.search.resolutions['180X240'],
             masterCategory: rec.content.data.masterCategory.typeName,
             subCategory: rec.content.data.subCategory.typeName,
             article: rec.content.data.articleType.typeName,
           };
         });
         res.json(data);
       },
       function (error) {
         res.send(error);
       }
     );
});


router.get('/:typeName', (req, res) => {
  const page = parseInt(req.query.page) * 10;
  const filter = req.query.f;
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
            qb.value('brandName', qb.bind('brand')),
            qb.value('gender', qb.bind('gender')),
            qb.value('baseColour', qb.bind('colour')),
            qb.value('typeName', qb.bindDefault()),
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
          image: rec.content.data.styleImages.search.resolutions['180X240'],
          masterCategory: rec.content.data.masterCategory.typeName,
          subCategory: rec.content.data.subCategory.typeName,
          article: rec.content.data.articleType.typeName,
          colour: rec.content.data.baseColour,
          gender: rec.content.data.gender,
          brand: rec.content.data.brandName,
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
    .result((doc) => {
      res.send(doc);
    });
})

module.exports = router;