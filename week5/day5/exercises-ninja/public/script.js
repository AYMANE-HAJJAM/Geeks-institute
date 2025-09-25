
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Madrid", "Berlin", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Newton", "Einstein", "Tesla", "Edison"],
        answer: "Einstein"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "Which year did the Titanic sink?",
        options: ["1910", "1912", "1914", "1916"],
        answer: "1912"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const submitBtn = document.getElementById("submit");
const scoreEl = document.getElementById("score");
const currentQuestionEl = document.getElementById("current-question");
const totalQuestionsEl = document.getElementById("total-questions");
const progressEl = document.getElementById("progress");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    // Update question counter and progress
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    totalQuestionsEl.textContent = questions.length;
    progressEl.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";
    feedbackEl.className = "";
    feedbackEl.textContent = "";
    selectedAnswer = null;
    submitBtn.disabled = false;

    currentQuestion.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option");
        btn.onclick = () => selectOption(btn, option);
        optionsEl.appendChild(btn);
    });
}

function selectOption(button, option) {
    // Remove selection from all options
    document.querySelectorAll(".option").forEach(btn => {
        btn.classList.remove("selected");
    });

    // Select the clicked option
    button.classList.add("selected");
    selectedAnswer = option;
}

function showFeedback(isCorrect, correctAnswer) {
    const options = document.querySelectorAll(".option");

    options.forEach(option => {
        if (option.textContent === correctAnswer) {
            option.classList.add("correct");
        } else if (option.classList.contains("selected") && !isCorrect) {
            option.classList.add("incorrect");
        }
        option.style.pointerEvents = "none";
    });

    feedbackEl.classList.add("show");
    if (isCorrect) {
        feedbackEl.textContent = "✅ Correct! Well done!";
        feedbackEl.classList.add("correct");
        score++;
    } else {
        feedbackEl.textContent = `❌ Wrong! The correct answer is: ${correctAnswer}`;
        feedbackEl.classList.add("incorrect");
    }
}

function showScore() {
    document.getElementById("quiz").classList.add("hidden");
    scoreEl.classList.remove("hidden");

    let message = "";
    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        message = "🏆 Perfect! You're a quiz master!";
    } else if (percentage >= 80) {
        message = "🎉 Excellent work!";
    } else if (percentage >= 60) {
        message = "👍 Good job!";
    } else {
        message = "📚 Keep studying!";
    }

    scoreEl.innerHTML = `
                <div>${message}</div>
                <div style="font-size: 2rem; margin: 20px 0;">
                    ${score}/${questions.length}
                </div>
                <div style="font-size: 1.2rem;">
                    ${percentage.toFixed(0)}% Correct
                </div>
                <button class="restart-btn" onclick="restartQuiz()">Take Quiz Again</button>
            `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;

    scoreEl.classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    loadQuestion();
}

submitBtn.onclick = () => {
    if (!selectedAnswer) {
        feedbackEl.classList.add("show", "incorrect");
        feedbackEl.textContent = "⚠️ Please select an answer!";
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    submitBtn.disabled = true;
    showFeedback(isCorrect, currentQuestion.answer);

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }, 2000);
};

// Initialize the quiz
loadQuestion();