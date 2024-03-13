const express = require('express');
const router =express.Router();

const path = require('path')
const multer = require('multer')
const uuid4 = require('uuid4')
const upload = multer({
	storage: multer.diskStorage({
    filename(req, file, done){
      const randomID = uuid4();
      const ext = path.extname(file.originalname);
      const filename = randomID + ext;
      done(null, filename);
    },
    destination(req, file, done){
      console.log(file);
      done(null, path.join( __dirname, "../public/image"))
    }
  })
});

const {getPost,createPost,updateContact,deletPost,addPostForm,addPostTextForm} = require("../controllers/contactController")

router
  .route("/")
  .get(getPost)
//  .post(createPost)
//  .put(updateContact)
//  .delete(deletPost);

router
  .route("/upload/:id")
  .get(addPostForm)
  .post(upload.single('postImage'),createPost)
router
  .route("/uploadText")
  .get(addPostTextForm)    

module.exports =router;

