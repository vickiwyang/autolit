const models = require('../models/articleModel');
const request = require('request');
const fetch = require('node-fetch');

const ancestorController = {};

// using request
// ancestorController.getRefs = (req, res, next) => {
//   console.log("Getting references for these seeds: ", res.locals.seeds);
//   const REFS_URI = 'https://opencitations.net/index/api/v1/references/';
//   // res.locals.cited = [];
//   // console.log("res.locals BEFORE: ", res.locals);
//   const cited = [];
//   res.locals.seeds.forEach(seedPaper => {
//     request(REFS_URI + `${seedPaper}`, (err, response, body) => {
//       const parsed = JSON.parse(body);
//       console.log(`${parsed.length} references found for ${seedPaper}`);
//       //res.locals.cited = [];
//       parsed.forEach(refPaper => {
//         console.log(refPaper.cited);
//         // res.locals.cited.push(refPaper.cited);
//         cited.push(refPaper.cited);
//       });
//     });
//     return cited;
//   });
//   console.log(cited);
//   // console.log("res.locals AFTER: ", res.locals);
//   return next();
// }

// using node.fetch
ancestorController.getRefs = (req, res, next) => {
  console.log("Getting references for these seeds: ", res.locals.seeds);
  const REFS_URI = 'https://opencitations.net/index/api/v1/references/';
  res.locals.cited = [];
  // console.log("res.locals BEFORE: ", res.locals);
  
  res.locals.seeds.forEach(seedPaper => {
    const cited = [];
    fetch(REFS_URI + `${seedPaper}`)
      .then(res => res.json())
      .then(json => {
        console.log(`${json.length} references found for ${seedPaper}`);
        json.forEach(refPaper => {
          console.log(refPaper.cited);
          res.locals.cited.push(refPaper.cited);
          //cited.push(refPaper.cited);
        });
      });
  });
  //console.log(cited);
  console.log("res.locals AFTER: ", res.locals);
  return next();
}

module.exports = ancestorController;