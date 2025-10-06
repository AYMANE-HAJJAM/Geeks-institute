const express = require('express');
const router = express.Router();
const { getUsers, getUser, registerUser, loginUser, updateUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);

module.exports = router;
