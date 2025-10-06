const express = require("express");
const router = express.Router();
const {register,usermodify,login,getUsers}=require('../controllers/users.controllers.js');
router.post("/register",register );
router.post("/login",login);
router.get("/",getUsers);
router.put("/:id",usermodify );

module.exports = router;
