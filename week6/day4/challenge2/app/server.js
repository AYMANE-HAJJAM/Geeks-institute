const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', usersRouter);
app.use((req, res) => {
res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));