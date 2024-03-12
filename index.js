const express = require("express");
const dbConnect = require("./config/dbConnect")
//const errorhandler = require("./middlewares/errorhandler") //오류처리 미들웨어 추가

const server = express();

// 엔진 설정
server.set("view engine", "ejs");
server.set("views", "./views");

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
