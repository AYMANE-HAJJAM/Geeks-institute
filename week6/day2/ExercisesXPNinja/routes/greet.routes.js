const express = require('express');
const router = express.Router();
const emojis = ['😀', '🎉', '🌟', '💖', '🔥'];
router.get('/', (req, res) => {
    res.json(emojis);
});
router.post('/greet', (req, res) => {
    const { name, emoji } = req.body;
    if (!name) {
        return res.send('❌ Please enter your name!');
    }
    res.json(`<h1>Hello ${name}! ${emoji}</h1>`);
});
module.exports = router;
