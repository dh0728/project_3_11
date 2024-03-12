const express = require('express');
const router =express.Router();
const {getPost,createPost,updateContact,deletPost,addPostForm} = require("../controllers/contactController")

router
  .route("/upload/:id")
  .get(addPostForm)
  .post(createPost) 

router
  .route("/:id")
  .get(getPost)
  .post(createPost)
  .put(updateContact)
  .delete(deletPost);

module.exports =router;