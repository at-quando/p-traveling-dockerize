var Auth = require('../models/authentication');
var passport = require('passport');
var Post = require('../models/post');
var User = require('../models/user');
var PostLike = require('../models/postlike');
var mongoose = require('mongoose');

exports.index = function(req, res, next) {
  var params = req.query;
  Post.getAllPost({}, function(err, posts, currentLike) {
    res.send({
      posts
    });
  });
}

exports.indexwAuth = function(req, res, next) {
  console.log(12345555,res.locals.header.user_id);
  var params = req.query;
  Post.getAllPostwAuth(res.locals.header.user_id, function(err, posts, currentLike) {
    res.send({
      posts,
      currentLike
    });
  });
}

exports.show = function(req, res, next) {
  var params = req.params.id;
  Post.showPost(params, function(err, post, comments) {
    res.send({
      post,
      comments
    });
  });
}

exports.create = function(req, res, next) {
  req.connection.setTimeout(60*10*1000);
  User.getUserById(res.locals.header.user_id, function(err, result) {
    var newPost = new Post({
      content: req.body.content,
      image: req.files[0].filename,
      posted_by: res.locals.header.user_id,
      hashtag: req.body.hashtag
    });
    Post.createPost(newPost, function(err, post){
      if (err) throw err;
      res.send({
        post
      })
    });
  })
}

exports.like = function(req, res, next) {
  req.connection.setTimeout(60*10*1000);
  PostLike.findOne({user_id: res.locals.header.user_id, post_id: req.body._id}, function (err, postLike) {
    if (err) throw err;
    if (!postLike) {
      Post.updateOne({_id: req.body._id},{ $inc: {likes: 1}}, function (err, post) {
        var newLike = new PostLike({
          post_id: mongoose.Types.ObjectId(req.body._id),
          user_id: res.locals.header.user_id
        });
        PostLike.createLike(newLike, function (err, like) {
          res.send({like})
        });
      });
    }
    else {
      Post.updateOne({_id: req.body._id},{ $inc: {likes: -1}}, function (err, post) {
        PostLike.remove({_id: postLike._id}, function (err, like) {
          res.send({like})
        });
      });
    }
  })
}

exports.check = function(req, res, next) {
  PostLike.findOne({user_id: res.locals.header.user_id, post_id: req.query.post_id}, function (err, postLike) {
    if (err) throw err;
    if (!postLike) {
      res.status(404).send({});
    }
    else {
      res.status(200).send({});
    }
  })
}