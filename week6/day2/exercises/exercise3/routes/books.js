import express from 'express';

const router = express.Router();

let books = [];

router.get('/', (req, res) => {
    res.send(books);
});

router.post('/', (req, res) => {
    const data = req.body;
    books.push(data);
    res.send('nice', books);
});
router.put('/:id', (req, res) => {
    const { completed, title } = req.body;
    const id = req.params.id;
    const book = books.find(boo => boo.id == id);
    book.title = title;
    book.completed = completed;
    res.send('nice', books);
});




router.delete('/:id', (req, res) => {
    const id = req.params.id;
    books = books.filter(book => book.id != id);
    res.send('nice', books);
});
module.exports = router;