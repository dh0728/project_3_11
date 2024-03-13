const express = require('express');
const router =express.Router();

const path = require('path')
const multer = require('multer')

//로그인 확인
const cookieParser = require("cookie-parser");
const checkLogin = require("../middlewares/checkLogin")

const {getPost,createPost,updateContact,deletPost,addPostForm,addPostTextForm ,getHome} = require("../controllers/contactController")

router.use(cookieParser());

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

router
  .route("/")
  .get(checkLogin,getHome)
router
  .route("/upload")
  .get(checkLogin,addPostForm)
  .post(checkLogin,upload.array('postImage'),createPost)

module.exports =router;

