const marklogic = require('marklogic');
const my = require('./my-connection.js');
const db = marklogic.createDatabaseClient(my.connInfo);


const fs = require('fs');
const path = require('path');

const dir = './data';

// let rawdata = fs.readdirSync(dir)
//   .filter((name) => path.extname(name) === '.json')
//   .map((name) => fs.readFileSync(path.join(dir, name)));

let rawdata = fs.readFileSync('./data/3450.json');
let fashion = JSON.parse(rawdata);
console.log(fashion);

const documents = [{ uri: '3450.json', content: fashion }];

// Document descriptors to pass to write().
// const documents = [
//   {
//     uri: '/gs/aardvark.json',
//     content: {
//       name: 'aardvark',
//       kind: 'mammal',
//       desc: 'The aardvark is a medium-sized burrowing, nocturnal mammal.',
//     },
//   },
//   {
//     uri: '/gs/bluebird.json',
//     content: {
//       name: 'bluebird',
//       kind: 'bird',
//       desc: 'The bluebird is a medium-sized, mostly insectivorous bird.',
//     },
//   },
//   {
//     uri: '/gs/cobra.json',
//     content: {
//       name: 'cobra',
//       kind: 'mammal',
//       desc: 'The cobra is a venomous, hooded snake of the family Elapidae.',
//     },
//   },
// ];

// Load the example documents into the database
db.documents.write(documents).result(
  function (response) {
    console.log('Loaded the following documents:');
    response.documents.forEach(function (document) {
      console.log('  ' + document.uri);
    });
  },
  function (error) {
    console.log(JSON.stringify(error, null, 2));
  }
);
