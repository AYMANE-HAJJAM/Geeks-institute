const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./config/database');

app.use(express.json());
app.use('/api', userRoutes);

const PORT = 5000;

sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});
