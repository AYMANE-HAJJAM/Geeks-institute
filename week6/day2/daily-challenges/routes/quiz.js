import express from 'express';

const router = express.Router();

const triviaQuestions = [
    {
        question: "What is the capital of France?",
        answer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
    },
    {
        question: "What is the largest mammal in the world?",
        answer: "Blue whale",
    },
];

currentQuestionIndex = 0;
score = 0;

router.get('/', (req, res) => {
    currentQuestionIndex = 0;
    score = 0;
    res.send(`
        
    `);

});