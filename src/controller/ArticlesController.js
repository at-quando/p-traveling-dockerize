var passport = require('passport');
var mongoose = require('mongoose');
var Article = require('../models/article');

exports.create = function(req, res, next) {
  try {
    var article = new Article({
      title: req.body.title,
      content: req.body.content,
      user_id: res.locals.header.user_id
    });
    Article.createArticle(article, function (err, article) {
      console.log(article);
      res.send({
        article
      })
    });
  }
  catch (e) {
    console.log('erase all image');
  }
}
