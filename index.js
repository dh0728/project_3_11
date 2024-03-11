const express = require("express");
const dbConnect = require("./config/dbConnect")

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
server.use("/", require("./routes/loginRoutes"))
server.use("/home", require("./routes/contactRoutes"))

server.listen(3000, ()=>{
  console.log("server started")
})

//login화면 시작화면
//erver.use("/", require("./routes/loginRoutes"));

//로그인시 피트?
server.use("/home",require("./routes/contactRoutes"));

server.listen(3000, ()=>{
  console.log(`${port}번 포트 사용 중`)
})