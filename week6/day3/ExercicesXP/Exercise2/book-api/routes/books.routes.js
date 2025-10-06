const express=require('express');
const {deletebook,updatebook,createbook,getbook,getbooks}=require('../controllers/books.controllers.js');
const router=express.Router();
router.get('/',getbooks);
router.get('/:id',getbook);
router.post('/',createbook);
router.put('/:id',updatebook);
router.delete('/:id',deletebook);

module.exports=router;