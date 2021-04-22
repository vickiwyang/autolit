const express = require('express');

const articlesController = require('./../controllers/articlesController');

const router = express.Router();

router.get('/',
  articlesController.getArticles,
  (req, res) => res.status(200).json(res.locals.articles)
);

module.exports = router;