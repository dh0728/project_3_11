const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  postImage: {
    type:[String],
    required: function() {
      return !this.postText; // postImage가 없을 때 postText가 필요하도록 설정합니다.
    }
  },
  postText: {
    type: String,
    required: function() {
      return !this.postImage; // postImage가 없을 때 postText가 필요하도록 설정합니다.
    },
  },
  goodNum: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    default: null,
  },
});

const Post = mongoose.model("Post", postSchema);  
module.exports = {Post};