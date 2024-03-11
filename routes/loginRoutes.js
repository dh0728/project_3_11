const express = require("express");
const router = express.Router();
const {
  getLogin, loginUser, getJoin, joinUser,
} = require("../controllers/loginController");

router.route("/")
  .get(getLogin)
  .post(loginUser)
router.route("/join")
  .get(getJoin)
  .post(joinUser)

module.exports = router;
