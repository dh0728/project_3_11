const express = require("express");
const dbConnect = require("./config/dbConnect")

const server = express();
// const server = http.createServer((req,res)=>{
//   console.log("request received")
// });

const port = 3000;
dbConnect();

//routes
server.use("/", require("./routes/loginRoutes"))
// server.use("/home", require("./routes/contactRoutes"))


server.listen(3000, ()=>{
  console.log("server started")
})

