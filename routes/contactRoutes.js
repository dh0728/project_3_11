const express = require('express');
const router =express.Router();

const multer = require('multer')
const upload = multer({
	dest: 'public/image'
});

const {getPost,createPost,updateContact,deletPost,addPostForm,addPostTextForm} = require("../controllers/contactController")

router
  .route("/")
  .get(getPost)
//  .post(createPost)
//  .put(updateContact)
//  .delete(deletPost);

router
  .route("/upload")
  .get(addPostForm)
  .post(upload.single('postImage'),(req, res) => {
    console.log(req.file)
  })
router
  .route("/uploadText")
  .get(addPostTextForm)    

module.exports =router;