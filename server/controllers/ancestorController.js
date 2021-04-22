const models = require('../models/articleModel');
const request = require('request');
const fetch = require('node-fetch');

const ancestorController = {};

ancestorController.clearAncestors = (req, res, next) => {
  models.Ancestors.deleteMany({})
    .then(() => {
      console.log("Ancestors of past seeds cleared from database");
      return next();
    })
    .catch((err) => res.status(400).send(`error in ancestorController: ${err}`));
}

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
  const COUNT_URI = 'https://opencitations.net/index/api/v1/citation-count/';
  res.locals.cited = []; // how to access outside of this middleware?
  res.locals.counts = {}; // how to access outside of this middleware?

  res.locals.seeds.forEach(seedPaper => {
    fetch(REFS_URI + `${seedPaper}`)
      .then(res => res.json())
      .then(json => {
        console.log('----------');
        console.log(`${json.length} references found for ${seedPaper}:`);
        json.forEach(refPaper => {
          const refDoi = refPaper.cited.slice(8); // get only the doi
          console.log(refDoi);
          res.locals.cited.push(refDoi);
          //console.log(res.locals);

          // make another API call to get refPaper's citation count (using its doi)
          fetch(COUNT_URI + `${refDoi}`)
            .then(res => res.json())
            .then(json => {
              const count = json[0].count;
              //console.log(`${refDoi} has ${count} citations`);
              //res.locals.counts[refDoi] = count;
              //console.log(res.locals.counts);

              // SAVE TO DATABASE COLLECTION:
              // using Model.update(), create a document if none exist for this doi
              // otherwise increment its common count
              models.Ancestors.findOneAndUpdate({ doi : refDoi }, 
                { doi : refDoi, citation_count : count, $inc: { commons : 1 } }, { upsert : true },
                (err, data) => {
                  if (err) res.status(400).send(`error in ancestorController: ${err}`);
                });
            });
        });
        //console.log("COLLECTION OF CITED: ", res.locals.cited); // why does this work
        //console.log("REFS AND COUNTS: ", res.locals.counts); // but not this?
      });
  });
  return next();
}

// doesn't curreently work; res.locals.cites doesn't persist from last middleware
// ancestorController.getCommons = (req, res, next) => {
//   console.log("LOOK AT ALL THE CITES I COLLECTED :", res.locals);
//   return next();
// }

module.exports = ancestorController;