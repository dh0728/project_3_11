const asyncHandler = require("express-async-handler");
const { User, Follower } = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
// console.log("◆◇ ", jwtSecret, " ◇◆");

// @desc Get Login page
// @route GET /
const getLogin = (req, res) => {
  res.render("login", {ok: true});
};

// @desc Get Login page
// @route POST /
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // id 확인
  const user = await User.findOne({ userid: username });
  if (!user) {
    return res.status(401).render("login", { ok: false, message: "일치하는 사용자가 없습니다."});
  }
  // password 확인
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).render("login", { ok: false, message: "비밀번호가 틀렸습니다."});
  }
  // 로그인 성공
  // obejct ID 사용해서 JWT 토큰 생성
  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  // console.log(user.userid)
  res.redirect("home");
  // res.render("index", {user:user.userid});
});

// @desc Get Join page
// @route GET /join
const getJoin = (req, res) => {
  res.render("join", { ok: true });
};

// @desc Get Login page
// @route POST /join
const joinUser = asyncHandler(async (req, res) => {
  // 사용자 입력 정보 받아오기
  const { user_id, name, email, password, password2 } = req.body;
  // 비밀번호 확인
  if (password === password2) {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userid: user_id, name: name, email: email, password: hashedPassword})
    // console.log(user._id)
    const follow = await Follower.create({ userobj:user._id, userid: user.userid, followingId: [], followerId: [] })
    // res.status(201).json({ message: "Register success", user: user});
    res.redirect("/");
  } else {
    return res.status(401).render("join", { ok: false, message: "비밀번호가 일치하지 않습니다."});
  }
})

const logout = (req,res) => {
  res.clearCookie("token");
  res.redirect("/")
}

module.exports = {
  getLogin, loginUser, getJoin, joinUser,logout
}