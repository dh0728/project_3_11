const asyncHandler = require("express-async-handler");
const {Post}= require("../models/contactModel");
const {User}= require("../models/userModel");

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

//@desc Post 게시글 업로드
//@route POST /home 
const createPost = asyncHandler(async (req, res)=>{
  console.log(req.body);
  const { userid, postImage, postText, goodNum, comment} = req.body;
  userid=req.params.id;
  goodNum=0;
  comment=null;
  if(!postImage && !postText){
    return res.status(400).send("게시할 이미지나 글중 하나는 필수야.")
  }
  const post = await Post.create({
    userid,
    postImage,
    postText,
    goodNum,
    comment,
  });
  res.status(200).send("Contacts page")
})

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

module.exports = {getPost, createPost, updateContact,deletPost,addPostForm};