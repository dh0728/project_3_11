const express = require("express");
const dbConnect = require("./config/dbConnect")

const server = express();
// const server = http.createServer((req,res)=>{
//   console.log("request received")
// });

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

