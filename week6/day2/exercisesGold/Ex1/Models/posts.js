const mongoose = require('mongoose');
const PostsModel=new mongoose.Schema({
    title:{type:String,required:true},
    content :{type:String,required:true},
    timestamp: { type: Date, default: Date.now },

});
const PostModel=mongoose.model('Post',PostsModel);
module.exports=PostModel;
