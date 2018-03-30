var Auth = require('../models/authentication');
var passport = require('passport');
var Post = require('../models/post');
var User = require('../models/user');
var PostLike = require('../models/postlike');
var mongoose = require('mongoose');

exports.create = function(req, res, next) {
  var link = req.files[0].filename
  res.send({
    link
  });
}

exports.destroy = function(req, res, next) {
  var link = req.files[0].filename
  res.send({
    link
  });
}
