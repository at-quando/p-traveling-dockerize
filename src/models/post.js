var mongoose = require('mongoose');
var User = require('./user');
var Location = require('./location');
var PostLike = require('./postlike');
var Comment = require('./comment');
var db = mongoose.connection;

//Place schema
var PostSchema = new mongoose.Schema({
  content: {
    type: String
  },
  location_id: {
    type: Number,
    ref: 'Location'
  },
  image: {
    type: String
  },
  likes: {
    type: Number, default: 0
  },
  comment_counter: {
    type: Number, default: 0
  },
  hashtag: {
    type: String
  },
  posted_by: {
    type: Number,
    ref: 'User'
  },
  created_at: { 
    type: Date, required: true, default: Date.now 
  }
});

var Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getAllPost= function({}, callback) {
  var results = [];
  Post.find({}).populate('posted_by').sort({ created_at: -1 }).exec(function (err, posts) {
    callback(null, posts);
  });
}

module.exports.getAllPostwAuth= function(id, callback) {
  var results = [];
  Post.find({}).populate('posted_by').sort({ created_at: -1 }).exec(function (err, posts) {
    postIdArr = posts.map(x => x._id);
    PostLike.find({user_id: id, post_id: {$in: postIdArr}}).exec(function (err,result) {
      result = result.map(x => x.post_id)
      callback(null, posts, result);
    });
  });
}

module.exports.showPost= function(id, callback) {
  Comment.find({post_id: mongoose.Types.ObjectId(id)}).populate('user_id').exec(function (err, comments) {
    db.collection('posts').aggregate([
      {
        $lookup: {
          from: "postlikes",
          localField: "_id",
          foreignField: "post_id",
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "likes.user_id",
          foreignField: "_id",
          as: "user",
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "posted_by",
          foreignField: "_id",
          as: "posted_by",
        }
      },
      {
        $unwind: "$posted_by"
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image: 1,
          posted_by: 1,
          hashtag: 1,
          created_at: 1,
          comment_counter: 1,
          comments: 1,
          user: {
            name: 1
          }
        }
      },
      { 
        $match : {
          _id: mongoose.Types.ObjectId(id) 
        }
      }
    ], function (err, result) {
      callback(null, result[0], comments);
    });
  })
}

module.exports.createPost = function(newPost, callback){
  newPost.save(callback);
}
