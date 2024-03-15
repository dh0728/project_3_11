const asyncHandler = require("express-async-handler");
const {Post}= require("../models/contactModel");
const {User, Follower}= require("../models/userModel");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
console.log(`◇◆${jwtSecret}◆◇`)

//@desc Get 피트화면 
//@route Get /home 
const getHome=asyncHandler(async (req, res) => {
  // console.log(req);
  const token = req.cookies.token;
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.error('JWT verification failed:', err);
      return;
    }
    console.log(decoded.id)
  })
  let showdb = await Post.find()
  //console.log(showdb[0].postImage)
  res.render('index',{showdb : showdb});
  // res.render("index")
}) 


const addPostForm = (req, res) => {
  res.render("upload")
} 
const getMypage =asyncHandler(async (req, res) => {
  // 현재사용자 _id값 가져오기
  const token = req.cookies.token;
  const decoded= jwt.verify(token, jwtSecret)
  preuser=decoded.id.toString()
  const user =await User.findById(preuser);
  console.log(user.userid)
  // post 정보 mypage.ejs로 넘기기
  const showdb = await Post.find({userid:user.userid})
  const showfollow = await Follower.findOne({userid:user.userid})
  console.log(showdb)
  console.log(showfollow)
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
  console.log(postText);
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

//@desc update follow
//@route PUT /home
const updateFollower = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, jwtSecret);
  const me_id = decoded.id;
  const following_id = req.body.following;
  // console.log(">>",me_id);
  // console.log(req.body.following);
  // 내 팔로잉에 추가
  const me = await Follower.findOne({userobj : me_id})
  if (me.followingId.includes(following_id) || me_id === following_id){
    console.log("already following")
    return res.redirect("/home")
  }
  await Follower.findOneAndUpdate({userobj : me_id}, {$push:{followingId: following_id}});
  // 나를 팔로워에 추가
  const following = await Follower.findOneAndUpdate({userid: following_id}, {$push:{followerId: me.userid}});
})

module.exports = {createPost, updateContact,deletPost,addPostForm, getHome,getMypage, updateFollower};