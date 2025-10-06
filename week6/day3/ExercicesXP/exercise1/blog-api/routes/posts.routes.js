const express=require('express');
const {deletePost,updatePost,createPost,getPost,getPosts}=require('../controllers/posts.controllers.js');
const router=express.Router();
router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);



module.exports=router;