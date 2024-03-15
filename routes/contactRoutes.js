const express = require('express');
const router =express.Router();

const path = require('path')
const multer = require('multer')
const uuid4 = require('uuid4');
//로그인 확인
const cookieParser = require("cookie-parser");
const checkLogin = require("../middlewares/checkLogin")

const {createPost,updateContact,deletPost,addPostForm ,getHome, getMypage, updateFollower} = require("../controllers/contactController");
const { Follower } = require('../models/userModel');

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
  .put(checkLogin,updateFollower)
router
  .route("/upload")
  .get(checkLogin,addPostForm)
  .post(checkLogin,upload.array('postImage'),createPost)
router
  .route("/mypage")
  .get(checkLogin,getMypage)
module.exports =router;


// const storage= multer.diskStorage({
//   distination : function(req, file, cb){
//     cb(null, './public/image')
//   },
//   filename : function(req, file, cb){
//     cb(null,file.originalname)
//   }
// });

// const upload = multer({
//   storage : storage,
//   fileFilter: function (req, file, cb){
//     var ext=path.extname(file.originalname);
//     if(ext !=='.png' && ext !=='.jpg' && ext !=='.jpeg'){
//       return cb(new Error('PNG, JPG 파일만 업로드 가능합니다.'))
//     }
//     cb(null, true)
//   },
//   limits:{
//     fileSize:1024*1024
//   }
// })