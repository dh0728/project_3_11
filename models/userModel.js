const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  followingNum: {
    type: Number,
  },
  followerNum: {
    type: Number,
  },
  postNum: {
    type: Number,
  },
});

const followerSchema = new mongoose.Schema({
  userid: {
    type:String,
    required: true,
    unique: true,
  },
  followingId: {
    type: Array,
  },
  followerId: {
    type: Array,
  },
})

const User = mongoose.model("User", userSchema);  // user schema로 모델을 만들어서 내보내기
const Follower = mongoose.model("Follower", followerSchema);
module.exports = {User, Follower};