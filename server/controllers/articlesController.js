const models = require("../models/articleModel");

const articlesController = {};

articlesController.getArticles = (req, res, next) => {
  models.Ancestors.find({})
    .then(data => {
      res.locals.articles = data;
      console.log("IS ANYTHING HERE??? " + res.locals.articles);
      return next();
    })
    .catch((err) => res.status(400).send(`error in articlesController: ${err}`));
};

module.exports = articlesController;