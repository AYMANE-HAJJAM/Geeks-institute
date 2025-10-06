const express=require('express');
const {deletetodo,updatetodo,createtodo,gettodo,gettodos}=require('../controllers/todos.controllers.js');
const router=express.Router();
router.get('/',gettodos);
router.get('/:id',gettodo);
router.post('/',createtodo);
router.put('/:id',updatetodo);
router.delete('/:id',deletetodo);

module.exports=router;