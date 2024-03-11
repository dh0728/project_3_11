const express = require("express");
const dbConnect = require("./config/dbConnect")

const server = express();

const port = 3000;
dbConnect();

// const server = http.createServer((req,res)=>{
//   console.log("request received")
// });

server.listen(3000, ()=>{
  console.log("server started")
})