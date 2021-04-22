const models = require("../models/articleModel");

const seedController = {};

seedController.clearSeeds = (req, res, next) => {
  models.Seeds.deleteMany({})
    .then(() => {
      console.log("Past seeds cleared from database");
      return next();
    })
    .catch((err) => res.status(400).send(`error in seedController: ${err}`));
};

seedController.setSeeds = (req, res, next) => {
  // parse comma-separated DOIs from req.body
  // "doi1, doi2, doi3" -> ["doi1", " doi2", " doi3"] -> ["doi1", "doi2", "doi3"]
  console.log("request body: ", req.body);
  const seeds = req.body.seeds.split(",");
  for (let i = 0; i < seeds.length; i++) {
    seeds[i] = seeds[i].trim();
  }
  res.locals.seeds = seeds;
  //res.locals.seeds = req.body.seeds;

  // array of new seeds
  const newSeeds = [];
  for (let i = 0; i < seeds.length; i++) {
    let newSeed = {};
    newSeed.doi = seeds[i];
    newSeeds.push(newSeed);
  }

  //console.log(newSeeds);
  models.Seeds.create(newSeeds, (err, data) => {
    if (err) res.status(400).send(`error in seedController: ${err}`);
    data = newSeeds;
    return next();
  });
};

module.exports = seedController;
