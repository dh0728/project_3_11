const express = require("express");
const dbConnect = require("./config/dbConnect")
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
//const errorhandler = require("./middlewares/errorhandler") //오류처리 미들웨어 추가

const server = express();
server.use(cookieParser());

// 엔진 설정
server.set("view engine", "ejs");
server.set("views", "./views");
server.use(express.static("./public"));
server.use(methodOverride("_method"));

const port = 3000;
dbConnect();

// 서버쪽에서 json 처리 가능하게 해줌
server.use(express.json());
server.use(express.urlencoded({ extended: true }));  // 

//routes
server.use("/", require("./routes/loginRoutes"));
server.use("/home", require("./routes/contactRoutes"));

//server.use(errorhandler); //오류처리 미들웨어

server.listen(port, ()=>{
  console.log(`${port}번 포트 사용 중`)
})
