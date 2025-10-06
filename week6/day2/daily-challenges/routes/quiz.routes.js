const express = require('express');
const router = express.Router();
const triviaQuestions = require('../models/trivia');
let userState = {
    currentQuestionIndex: 0,
    score: 0
};
router.get('/', (req, res) => {
    if(userState.currentQuestionIndex >= triviaQuestions.length){
        return res.redirect('/quiz/score');
    }
    const question = triviaQuestions[userState.currentQuestionIndex].question;
    res.send(`
        <h2>Question ${userState.currentQuestionIndex + 1}</h2>
        <p>${question}</p>
        <form method="POST">
            <input type="text" name="answer" placeholder="Your answer" required />
            <button type="submit">Submit</button>
        </form>
    `);
});
router.post('/', express.urlencoded({ extended: true }), (req, res) => {
    const userAnswer = req.body.answer.trim();
    const correctAnswer = triviaQuestions[userState.currentQuestionIndex].answer;
    if(userAnswer.toLowerCase() === correctAnswer.toLowerCase()){
        userState.score++;
        feedback = "✅ Correct!";
    } else {
        feedback = `❌ Wrong! The correct answer was "${correctAnswer}"`;
    }
    userState.currentQuestionIndex++;
        if(userState.currentQuestionIndex >= triviaQuestions.length){
        return res.redirect('/quiz/score');
    }
    res.send(`
        <p>${feedback}</p>
        <a href="/quiz">Next Question</a>
    `);
});
router.get('/score', (req, res) => {
    const score = userState.score;
    const total = triviaQuestions.length;
    userState = { currentQuestionIndex: 0, score: 0 };
    res.send(`<h2>Your final score: ${score} / ${total}</h2>
              <a href="/quiz">Play Again</a>`);
});

module.exports = router;
