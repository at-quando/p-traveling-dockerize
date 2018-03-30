var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var ArticlesController = require('../controller/ArticlesController');
var AppController = require('../controller/AppController');
var  ArticleValidation = require('../validation/ArticleValidation');

router.post('/', AppController.authorize, ArticleValidation.validate, ArticlesController.create);

module.exports = router;
