require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
// console.log("◆◇ ", jwtSecret, " ◇◆");

const checkLogin = async(req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
  const token = req.cookies.token;
  try {
    // const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtSecret);
    req.username = decoded.username;
    next();
  } catch (error) {
    console.log(error);
    // return res.redirect("/");
    console.log(jwtSecret)
    return res.redirect("/?message=" + encodeURIComponent("로그인이 필요합니다."));
  }
};

module.exports = checkLogin;