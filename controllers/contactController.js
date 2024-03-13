const asyncHandler = require("express-async-handler");
const {Post}= require("../models/contactModel");
const {User}= require("../models/userModel");

//@desc Get 피트화면 
//@route Get /home 
const getHome= (req, res) => {
  res.render("index")
} 

//@desc Get 프로필 정보 확인
//@route Get /home 
const getPost = asyncHandler(async (req,res)=>{
  const username= req.params.id;
  const post =Post.findOne({userid : username});
  console.log(post)
  res.status(200).send("")
}); 

const addPostForm = (req, res) => {
  res.render("upload")
} 
const addPostTextForm = (req, res) => {
  res.render("uploadText")
} 

//@desc Post 게시글 업로드
//@route POST /home 
const createPost = asyncHandler(async (req, res)=>{
  console.log(req.files);
  console.log(req.body)
  // const userid=req.params.id;
  const postImageArray = [];
  for(let i=0; i<req.files.length; i++){
    postImageArray.push(req.files[i].path)
  }
  postText = req.body.postText.toString();
  console.log(postText);
  goodNum=0;
  userid= "c"
  comment=null;
  if(!postImageArray && !postText){
    return res.status(400).send("게시할 이미지나 글중 하나는 필수야.")
  }
  const post = await Post.create({
    userid,
    postImage: postImageArray,
    postText,
    goodNum,
    comment,
  });
  res.status(200).send("Contacts page")
})

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

//@desc Post 게시글 업로드
//@route POST /home 
// const createPost = asyncHandler(async (req, res)=>{
//   console.log(req.body);
//   const { postText} = req.body;
//   const postImage = req.file;
//   console.log(req.body);
//   console.log(req.file)
//   let userid="c001"
//   let goodNum=0;
//   let comment=null;
//   if(!postImage && !postText){
//     return res.status(400).send("게시할 이미지나 글중 하나는 필수야.")
//   }
//   const post = await Post.create({
//     userid,
//     postImage: {
//       data:req.file.buffer,
//       constentType: req.fiel.mimetype,
//     },
//     postText,
//     goodNum,
//     comment,
//   });
//   res.status(200).send("Contacts page")
// })
// const createPost = asyncHandler(async (req, res)=>{
//   upload.single('postImage');
//   let userid="c001"
//   let goodNum=0;
//   let comment=null;
//   const { postText} = req.body;
//   console.log(postText)
//   const post = await Post.create({
//         userid,
//         postImage: {
//           data:req.file.buffer,
//           constentType: req.fiel.mimetype,
//         },
//         postText,
//         goodNum,
//         comment,
//       });
//       res.status(200).send("Contacts page")
// });

//@desc Update 게시글 
//@route Put /home/:id 
const updateContact = asyncHandler (async (req,res)=>{
  const username = req.params.id;
  const {postImage , postText }=req.body;
  const post = await Post.findOne({userid : username});
  if(!post){
    res.status(404);
    throw new Error("Contact not found")
  }
  post.postImage = postImage;
  post.postText= postText;

  post.save();
  res.status(200).send("Contacts page")
});

//@desc delete 게시글 
//@route delete /home/:id
const deletPost= asyncHandler(async(req,res)=>{
  const username= req.params.id;
  const post = await Post.deleteOne({userid : username});
  
  res.status(200).send(`delete: ${req.params.id}`)
});

module.exports = {getPost, createPost, updateContact,deletPost,addPostForm,addPostTextForm, getHome};