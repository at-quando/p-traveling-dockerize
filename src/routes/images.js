var express = require('express');
var router = express.Router();
var path = require('path');
var ImagesController = require('../controller/ImagesController');
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

router.post('/', AppController.authorize, upload.any(), ImagesController.create);

router.delete('/', ImagesController.destroy);

module.exports = router;
