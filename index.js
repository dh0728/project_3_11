const express = require("express");
const dbConnect = require("./config/dbConnect")

const server = express();

const port = 3000;
dbConnect();

server.get("/", (req,res)=>{
  res.status(200).send("Hello Node")
})

//login화면 시작화면
//erver.use("/", require("./routes/loginRoutes"));

//로그인시 피트?
server.use("/home",require("./routes/contactRoutes"));

server.listen(3000, ()=>{
  console.log(`${port}번 포트 사용 중`)
})