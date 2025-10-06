const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const  connectDB = async()=>{
    try{
        await mongoose.connect(process.env.Mongodb_url);
 console.log('connected to mongodb success');
    }
    catch(error){
        console.log('kayn chy mochkil f connection with mongodb');
    }
 

}
module.exports= connectDB;
