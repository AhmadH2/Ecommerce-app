const router = require('express').Router();
const marklogic = require('marklogic');
const my = require('../my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;

// Get all Categories list
router.get('/cats', (req, res) => {
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
router.get('/subcats/:master', (req, res) => {
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

// Get Products for a Master Category
router.get('/cats/:name', (req, res) => {
  const name = req.params.name;
  db.documents
    .query(qb.where(qb.collection(req.params.name)).slice(0, 10))
    .result(function (documents) {
      let ds = documents.map((rec) => {
        return {
          id: rec.content.data.id,
          title: rec.content.data.productDisplayName,
          price: rec.content.data.price / 100.0,
          brandName: rec.content.data.brandName,
          ageGroup: rec.content.data.ageGroup,
          baseColour: rec.content.data.baseColour,
          season: rec.content.data.season,
          image: rec.content.data.styleImages.default.resolutions['150X200'],
          masterCategory: rec.content.data.masterCategory.typeName,
          subCategory: rec.content.data.subCategory.typeName,
          description: rec.content.data.productDescriptors.description.value,
        };
      });
      res.json(ds);
    });
});

// Get Products for a subCategory
router.get('/subcats/:name/products', (req, res) => {
  const name = req.params.name;
  db.documents.query(qb.where(qb.collection(req.params.name)).slice(0, 10)).result(
  function (documents) {
      let ds = documents.map((rec) => {
        return {
          id: rec.content.data.id,
          title: rec.content.data.productDisplayName,
          price: rec.content.data.price / 100.0,
          brandName: rec.content.data.brandName,
          ageGroup: rec.content.data.ageGroup,
          baseColour: rec.content.data.baseColour,
          season: rec.content.data.season,
          image: rec.content.data.styleImages.default.resolutions['150X200'],
          masterCategory: rec.content.data.masterCategory.typeName,
          subCategory: rec.content.data.subCategory.typeName,
          description: rec.content.data.productDescriptors.description.value,
        };
      });
      res.json(ds);
  });
});

router.get('/test/:page', (req, res) => {
  qb.where(qb.collection('property')).withOptions({ total: true }).result((doc)=> res.send(doc));  
});



router.get('/', (req, res) => {
  db.documents
    .query(qb.where(qb.collection('fashion')).slice(0, 50))
    .result(function (records) {
      let ds = records.map((rec) => {
        return {
          id: rec.content.data.id,
          title: rec.content.data.productDisplayName,
          price: rec.content.data.price / 100.0,
          brandName: rec.content.data.brandName,
          ageGroup: rec.content.data.ageGroup,
          baseColour: rec.content.data.baseColour,
          season: rec.content.data.season,
          image: rec.content.data.styleImages.default.resolutions['150X200'],
          masterCategory: rec.content.data.masterCategory.typeName,
          subCategory: rec.content.data.subCategory.typeName,
          description: rec.content.data.productDescriptors.description.value,
        };
      });
      res.json(ds);
    });
});

router.get('/:id', (req, res) => {
  let uri = req.params.id + '.json';

  db.documents.read({ uris: uri }).result(function (response, err) {
    const rec = response[0];
    res.send({
      id: rec.content.data.id,
      title: rec.content.data.productDisplayName,
      price: rec.content.data.price / 100.0,
      brandName: rec.content.data.brandName,
      ageGroup: rec.content.data.ageGroup,
      baseColour: rec.content.data.baseColour,
      season: rec.content.data.season,
      masterCategory: rec.content.data.masterCategory.typeName,
      subCategory: rec.content.data.subCategory.typeName,
      description: rec.content.data.productDescriptors.description.value,
      sizes: rec.content.data.styleOptions.map((s) => s.value),
      images: [... new Set(Object.keys(rec.content.data.styleImages)
        .map((key) => rec.content.data.styleImages[key].imageURL)
        .filter((img) => !!img))],
    });
  });
});

module.exports = router;