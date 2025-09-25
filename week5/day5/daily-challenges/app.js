import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));


const emojis = [
    { emoji: "😀", name: "Smile" },
    { emoji: "🐶", name: "Dog" },
    { emoji: "🌮", name: "Taco" },
    { emoji: "⚽", name: "Soccer Ball" },
    { emoji: "🚗", name: "Car" },
    { emoji: "🍎", name: "Apple" },
    { emoji: "🎸", name: "Guitar" },
    { emoji: "🐱", name: "Cat" },
];

let leaderboard = []; // {name, score}

function getRandomQuestion() {
    const correct = emojis[Math.floor(Math.random() * emojis.length)];

    // Distractors
    let options = [correct.name];
    while (options.length < 4) {
        let random = emojis[Math.floor(Math.random() * emojis.length)].name;
        if (!options.includes(random)) {
            options.push(random);
        }
    }

    options.sort(() => Math.random() - 0.5);

    return {
        emoji: correct.emoji,
        correct: correct.name,
        options,
    };
}


app.get("/question", (req, res) => {
    res.json(getRandomQuestion());
});

app.post("/guess", (req, res) => {
    const { player, answer, correct } = req.body;

    let playerData = leaderboard.find((p) => p.name === player);
    if (!playerData) {
        playerData = { name: player, score: 0 };
        leaderboard.push(playerData);
    }

    let result;
    if (answer === correct) {
        playerData.score++;
        result = "✅ Correct!";
    } else {
        result = "❌ Wrong!";
    }

    res.json({
        message: result,
        score: playerData.score,
        next: getRandomQuestion(),
    });
});

// Endpoint: leaderboard
app.get("/leaderboard", (req, res) => {
    const sorted = leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);
    res.json(sorted);
});

app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
);
