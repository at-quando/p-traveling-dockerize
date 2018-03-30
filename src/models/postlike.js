var mongoose = require('mongoose');
var User = require('./user');
var Comment = require('./comment');
var db = mongoose.connection;
var Schema = mongoose.Schema;

//Place schema
var PostLikeSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    ref: 'User'
  },
  post_id: {
    type: Schema.ObjectId,
    ref: 'Post'
  }
});

var PostLike = module.exports = mongoose.model('PostLike', PostLikeSchema);

module.exports.createLike = function(like, callback){
  like.save(callback);
}
