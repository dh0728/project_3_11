const asyncHandler = require("express-async-handler");
const {Post}= require("../models/contactModel");
const {User, Follower}= require("../models/userModel");
const jwt = require("jsonwebtoken");
const { post } = require("../routes/contactRoutes");
const jwtSecret = process.env.JWT_SECRET;
console.log(`◇◆${jwtSecret}◆◇`)

//@desc Get 피트?화면 
//@route Get /home 
const getHome=asyncHandler(async (req, res) => {
  // console.log(req);
  const token = req.cookies.token;
  const decoded = jwt.verify(token, jwtSecret);
  const user = await User.findOne({_id: decoded.id})
  const id = user.userid
  let showdb = await Post.find()
  const follower = await Follower.findOne({userobj: decoded.id})
  const followList = follower.followingId
  // console.log(followList)///
  //console.log(showdb[0].postImage)
  res.render('index',{showdb : showdb, following: followList, id: id});
  // res.render("index")
}) 


const addPostForm = (req, res) => {
  res.render("upload")
} 

//@desc Get 마이페이지 화면 
//@route Get /home/mypage
const getMypage =asyncHandler(async (req, res) => {
  // 현재사용자 _id값 가져오기
  const token = req.cookies.token;
  const decoded= jwt.verify(token, jwtSecret)
  preuser=decoded.id.toString()
  const user =await User.findById(preuser);
  //console.log(user.userid)
  
  // post 정보 mypage.ejs로 넘기기
  const showdb = await Post.find({userid:user.userid})
  const showfollow = await Follower.findOne({userid:user.userid})
  //console.log(showdb)
  //console.log(showfollow)
  res.render('mypage',{showdb : showdb, showfollow: showfollow});
}) 

//@desc Post 게시글 업로드
//@route POST /home 
const createPost = asyncHandler(async (req, res)=>{
  const token = req.cookies.token;
  const decoded= await jwt.verify(token, jwtSecret)
  preuser=decoded.id.toString()
  const user =await User.findById(preuser);
  // console.log(req.files);
  // console.log(req.body);
  //console.log(preuser);
  //console.log(typeof(preuser))
  //console.log(user)
  const postImageArray = [];
  for(let i=0; i<req.files.length; i++){
    postImageArray.push(req.files[i].filename)
  }
  postText = req.body.postText.toString();
 // console.log(postText);
  goodNum=0;
  comment=null;
  if(!postImageArray && !postText){
    return res.status(400).send("게시할 이미지나 글중 하나는 필수야.")
  }
  const post = await Post.create({
    userid:user.userid,
    postImage: postImageArray,
    postText,
    goodNum,
    comment,
  });
  res.redirect('http://localhost:3000/home');
  // res.status(200).send(`삽입완료`)
})
const updateGet = asyncHandler(async (req, res, id) => {
  //console.log(req.params.id)
  const post= await Post.findById(req.params.id)
  res.render("update" ,{post:post})
})
const updatePost = asyncHandler(async (req, res) => {
  const postImageArray = [];
  for(let i=0; i<req.files.length; i++){
    postImageArray.push(req.files[i].filename)
  }
  postText = req.body.postText.toString();
  //console.log(postImageArray);
  //console.log(postText);
  //console.log(req.params.id)
  const beforePost = await Post.findById(req.params.id)
  console.log(beforePost.userid)
  const post = await Post.findByIdAndUpdate(req.params.id,{
    userid:beforePost.userid,
    postImage: postImageArray,
    postText:postText,
    goodNum:beforePost.goodNum,
    comment:beforePost.comment,
  },{ new: true })
  // const token = req.cookies.token;
  // const decoded= jwt.verify(token, jwtSecret)
  // preuser=decoded.id.toString()
  // const user =await User.findById(preuser);
  // const showdb = await Post.find({userid:beforePost.userid})
  // const showfollow = await Follower.findOne({userid:user.userid})
  // res.render('mypage',{showdb : showdb, showfollow: showfollow});
  res.redirect('http://localhost:3000/home/mypage');
  });
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
  const ID=req.body.postID
  console.log(ID)
  // console.log(postID)
  const post = await Post.deleteOne({ _id : ID});
  res.status(200).send("삭제")
});

//@desc update follow
//@route PUT /home
const updateFollower = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, jwtSecret);
  const me_id = decoded.id;
  const post_id = req.body.following;
  const following_id = await Post.findOne({_id: post_id}).userid
  // 본인은 팔로우할 수 없어요~
  const me = Follower.findOne({userobj: me_id})
  if (me.userid === following_id){
    return res.redirect(`/home#${post_id}`)
  }
  // 내 팔로잉에 추가 (addToSet: 배열에 중복없이)
  await Follower.findOneAndUpdate({userobj: me_id}, {$addToSet:{followingId: following_id}});
  // 나를 팔로워에 추가 (addToSet: 배열에 중복없이)
  await Follower.findOneAndUpdate({userid: following_id}, {$addToSet:{followerId: me.userid}});
  return res.redirect(`/home#${post_id}`)
})


const updateGood = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, jwtSecret);
  const me_id = decoded.id;
  const post_id = req.body.postname;
  // 좋아요에 추가
  const user = await User.findOne({_id:me_id})
  const post = await Post.findOneAndUpdate({_id : post_id}, {$addToSet:{goodList: user.userid}});
  return res.redirect(`/home#${post_id}`)
})

module.exports = {createPost, updateContact,deletPost,addPostForm, getHome,getMypage,updateGet,updatePost, updateFollower, updateGood};
