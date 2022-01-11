const router = require('express').Router();
const marklogic = require('marklogic');
const my = require('../my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;

// Get Products for a Master Category
router.get('/category/:name/products', (req, res) => {
  const name = req.params.name;
  const page = parseInt(req.query.page) * 10;
  db.documents
    .query(qb.where(qb.collection(req.params.name)).slice(page-10, page))
    .result(function (documents) {
      let ds = documents.map((rec) => {
        return {
          id: rec.content.data.id,
          title: rec.content.data.productDisplayName,
          price: rec.content.data.price / 100.0,
          // brandName: rec.content.data.brandName,
          // ageGroup: rec.content.data.ageGroup,
          // baseColour: rec.content.data.baseColour,
          // season: rec.content.data.season,
          image: rec.content.data.styleImages.default.resolutions['150X200'],
          masterCategory: rec.content.data.masterCategory.typeName,
          subCategory: rec.content.data.subCategory.typeName,
          // description: rec.content.data.productDescriptors.description.value,
        };
      });
      res.json(ds);
    });
});

// Get Products for a subCategory
router.get('/subcat/:name/products', (req, res) => {
  const page = parseInt(req.query.page) * 10;
  const name = req.params.name;
  db.documents.query(qb.where(qb.collection(req.params.name)).slice(page-10, page)).result(
  function (documents) {
      let ds = documents.map((rec) => {
        return {
          id: rec.content.data.id,
          title: rec.content.data.hasOwnProperty("productDisplayName")
          ? rec.content.data.productDisplayName: "Unknown",
          price: rec.content.data.hasOwnProperty("price")
          ? rec.content.data.price/100.0: "Unknown",
          // brandName: rec.content.data.brandName,
          // ageGroup: rec.content.data.ageGroup,
          // baseColour: rec.content.data.baseColour,
          // season: rec.content.data.season,
          image: rec.content.data.styleImages.search.resolutions['180X240'],
          masterCategory: rec.content.data.masterCategory.typeName,
          subCategory: rec.content.data.subCategory.typeName,
          // description:
          //   rec.content.data.productDescriptors.hasOwnProperty('description')
          //   ? rec.content.data.productDescriptors.description.value : '<p>No description available</p>' ,
        };
      });
      res.json(ds);
  });
});

// Get Product by id
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

// Get all Products
router.get('/', (req, res) => {
  const page = req.query.page * 10;
  db.documents
    .query(qb.where(qb.collection('fashion')).slice(page-10, page))
    .result(function (records) {
      let ds = records.map((rec) => {
        return {
          id: rec.content.data.id,
          title: rec.content.data.productDisplayName,
          price: rec.content.data.price / 100.0,
          // brandName: rec.content.data.brandName,
          // ageGroup: rec.content.data.ageGroup,
          // baseColour: rec.content.data.baseColour,
          // season: rec.content.data.season,
          image: rec.content.data.styleImages.default.resolutions['150X200'],
          masterCategory: rec.content.data.masterCategory.typeName,
          subCategory: rec.content.data.subCategory.typeName,
          // description: rec.content.data.productDescriptors.description.value,
        };
      });
      res.json(ds);
    });
});

module.exports = router;