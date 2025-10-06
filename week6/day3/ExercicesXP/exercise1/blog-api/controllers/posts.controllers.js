
const Post= require('../models/post.js');

const getPosts=async(req,res)=>{
    const posts=await Post.findAll();
    res.json(posts);
};
const getPost=async(req,res)=>{
    const id=req.params.id;
    const post=await Post.findByPk(id);
    res.json(post);
};
const createPost=async(req,res)=>{
    const data=req.body;
    const post=await Post.create(data);
    res.send('post created success ');
};
const updatePost=async(req,res)=>{
    const id=req.params.id;
        const data=req.body;
    const post=await Post.update(data, { where: { id } });
    res.send('post updated success ');
}
const deletePost=async(req,res)=>{
    const id=req.params.id;
    const post=await Post.destroy( { where: { id } });
    res.send('post deleted success ');
}
module.exports={deletePost,updatePost,createPost,getPost,getPosts};