const marklogic = require('marklogic');
const my = require('./my-connection.js');

const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;

// db.documents.query(qb.where(qb.collection('fashion'))).result(function (records) {
//     let ds = records.map((rec)=> {
//         return {
//           id: rec.content.data.id,
//           price: rec.content.data.price,
//           brandName: rec.content.data.brandName,
//           ageGroup: rec.content.data.ageGroup,
//           baseColour: rec.content.data.baseColour,
//           season: rec.content.data.season,
//           image: rec.content.data.styleImages.default.imageURL,
//         };
//     })
//   console.log(ds);
// });

db.documents
  .query(
    qb.where(qb.collection('fashion'))
      .calculate(qb.facet('typeName'))
      .withOptions({ categories: 'none' })
  )
  .result(
    function (results) {
     console.log(JSON.stringify(results, null, 2));
    },
    function (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  );