// app.js
import express from 'express';

const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data array
let books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937 },
  { id: 2, title: "1984", author: "George Orwell", publishedYear: 1949 },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960 }
];

// --- Read All Books ---
app.get('/api/books', (req, res) => {
  res.json(books);
});

// --- Read a Single Book ---
app.get('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find(b => b.id === bookId);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// --- Create a New Book ---
app.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ message: "Title, author, and publishedYear are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    publishedYear
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
