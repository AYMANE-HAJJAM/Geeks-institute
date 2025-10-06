import express from 'express';
import cors from 'cors';
import router from './routes/books.js';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());



app.use('/books', router);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})

