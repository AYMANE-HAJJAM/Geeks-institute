const express = require('express');
const app = express();
const quizRouter = require('./routes/quiz.routes');
app.use('/quiz', quizRouter);

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Trivia Quiz!</h1>
              <a href="/quiz">Start Quiz</a>`);
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
