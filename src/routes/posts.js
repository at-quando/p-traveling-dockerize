var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var path = require('path');
var PostsController = require('../controller/PostsController');
var AppController = require('../controller/AppController');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({ storage: storage });

router.get('/', PostsController.index);

router.get('/wAuth', AppController.authorize, PostsController.indexwAuth);

router.get('/check', AppController.authorize, PostsController.check);

router.get('/:id', PostsController.show);

router.post('/', AppController.authorize, upload.any(), PostsController.create);

router.post('/like', AppController.authorize, PostsController.like);

module.exports = router;
