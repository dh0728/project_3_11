const express = require('express');
const router =express.Router();

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage});

const {getPost,createPost,updateContact,deletPost,addPostForm} = require("../controllers/contactController")

router.route("/upload/:id").get(addPostForm)
router.route("/upload/:id").post(upload.single('postImage'),
  async (req, res) => {
      const image = new Post({
        userid: req.params.id,  
        postImage:{
        data: req.file.buffer,
        contentType: req.file.mimetype,
          },
        postText:req.body,
        goodNum:0,
        comment:null
      });
      await image.save()
      res.send("success");
  }
);



// router
//   .route("/:id")
//   .get(getPost)
//   .post(createPost)
//   .put(updateContact)
//   .delete(deletPost);

module.exports =router;