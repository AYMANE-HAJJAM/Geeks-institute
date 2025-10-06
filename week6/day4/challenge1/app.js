const express = require('express');
const cors = require('cors');
const taskRoutes = require('./Routes/tasks.routes.js');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
