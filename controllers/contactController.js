const asyncHandler = require("express-async-handler");
const Contact= require("../models/contactModel");

//@desc Get home
//@route Get /home 
const getHome = asyncHandler(async (req,res)=>{
  res.status(200).send("Contact Page");
}); 

module.exports = {getHome};