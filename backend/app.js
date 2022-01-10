const express = require('express');
const app = express();
const cors = require('cors');
const fashion = require("./routes/fashion")

app.use(cors());

app.use(express.json());

// Load documents into the database.

const marklogic = require('marklogic');
const my = require('./my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;

app.use('/fashion', fashion);

app.listen(9000, () => {
  console.log('app is listen to port 9000');
});