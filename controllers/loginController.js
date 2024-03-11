const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JSW_SECRET;
console.log("◆◇ ", jwtSecret, " ◇◆");

// @desc Get Login page
// @route GET /
const getLogin = (req, res) => {
  res.render("login");
};

// @desc Get Login page
// @route POST /
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // id 확인
  const user = await User.findOne({ userid: username });
  if (!user) {
    return res.status(401).json({ message: "일치하는 사용자가 없습니다...!" });
  }
  // password 확인
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "비밀번호가 틀렸습니다."});
  }
  // 로그인 성공
  // obejct ID 사용해서 JWT 토큰 생성
  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/home");
});

// @desc Get Login page
// @route GET /join
const getJoin = (req, res) => {
  res.render("join");
};

// @desc Get Login page
// @route POST /join
const joinUser = asyncHandler(async (req, res) => {
  // 사용자 입력 정보 받아ㅇ기
  const { user_id, name, email, password, password2 } = req.body;
  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);
  // 비밀번호 확인
  if (password === password2) {
    const user = await User.create({ userid: user_id, name: name, email: email, password: hashedPassword})
    // res.status(201).json({ message: "Register success", user: user});
    res.redirect("/");
  } else {
    res.status(401).send("비밀번호가 일치하지 않습니다.");
  }
})

module.exports = {
  getLogin, loginUser, getJoin, joinUser,
}