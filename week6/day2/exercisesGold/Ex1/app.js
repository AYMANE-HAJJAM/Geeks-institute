const express = require('express');
const cors = require('cors');
const app=express();
const connectDB = require('./Config/connect_db.js');
 const routerR = require ('./Routes/posts.routes.js');
app.use(cors());
app.use(express.json());

connectDB();
 app.use('/posts',routerR);

app.listen(3000,()=>{
    console.log('server running at http://localhost:3000/')
})
