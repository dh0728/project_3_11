const express = require('express');
const router =express.Router();
const {getHome} = require("../controllers/contactController")

router.route("/").get(getHome);

module.exports =router;