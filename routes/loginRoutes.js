const express = require("express");
const router = express.Router();
const {
  getLogin, loginUser, getJoin, joinUser, logout
} = require("../controllers/loginController");

router.route("/")
  .get(getLogin)
  .post(loginUser)
router.route("/logout")
  .get(logout)
router.route("/join")
  .get(getJoin)
  .post(joinUser)

module.exports = router;
