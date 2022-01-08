const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

// Load documents into the database.

const marklogic = require('marklogic');
const my = require('./my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;

app.get('/', (req, res)=> {
  db.documents
    .query(qb.where(qb.collection('fashion')))
    .result(function (records) {
      let ds = records.map((rec) => {
        return {
          id: rec.content.data.id,
          productName: rec.content.data.productDisplayName,
          price: rec.content.data.price,
          brandName: rec.content.data.brandName,
          ageGroup: rec.content.data.ageGroup,
          baseColour: rec.content.data.baseColour,
          season: rec.content.data.season,
          image: rec.content.data.styleImages.default.resolutions['150X200'],
        };
      });
      res.json(ds);
    });
})

app.listen(9000, () => {
  console.log('app is listen to port 9000');
});