const express = require('express');
const {getAllContacts,createContact,getContact ,updateContact, deletContact, addContactForm } = require("../controllers/contactController")
const cookieParser = require("cookie-parser");
const checkLogin= require("../middlewares/checkLogin");
const router = express.Router();
router.use(cookieParser());

router
  .route('/')
//.get((req,res)=>{res.status(200).send("Contacts page")}) //qurey형테로 넘어옴 
  .get(checkLogin,getAllContacts) 
//body에 담겨서 넘어오므로 URL에 안보임, 용량도 크다.

router
  .route("/add")
  .get(checkLogin,addContactForm)
  .post(checkLogin,createContact) 

router
  .route('/:id')
  .get(checkLogin,getContact)
  .put(checkLogin,updateContact)
  .delete(checkLogin,deletContact)

module.exports = router;