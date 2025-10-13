import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello From Express' });
});

app.post("/api/world", (req, res) => {
    console.log("✅ Request body:", req.body);

    const receivedValue = req.body.post;
    res.json({
        message: `I received your POST request. This is what you sent me: ${receivedValue}`
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
