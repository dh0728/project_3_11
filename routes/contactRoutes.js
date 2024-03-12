const express = require('express');
const router =express.Router();
const {getPost,createPost,updateContact,deletPost} = require("../controllers/contactController")


router.route("/:id").get(getPost).post(createPost).put(updateContact).delete(deletPost);

module.exports =router;