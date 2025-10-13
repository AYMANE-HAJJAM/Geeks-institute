import React, { useState } from "react";
import quotes from "./QuotesDatabase";

const colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6", "#FB6964", "#342224"];

const QuoteBox = () => {
    const [index, setIndex] = useState(Math.floor(Math.random() * quotes.length));
    const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)]);

    const getNewQuote = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === index);

        setIndex(newIndex);
        setColor(colors[Math.floor(Math.random() * colors.length)]);
    };

    const currentQuote = quotes[index];

    return (
        <div
            style={{
                backgroundColor: color,
                color: "white",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    color: color,
                    borderRadius: "10px",
                    padding: "30px",
                    width: "500px",
                    textAlign: "center",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)"
                }}
            >
                <h2>"{currentQuote.quote}"</h2>
                <p>- {currentQuote.author}</p>
                <button
                    style={{
                        backgroundColor: color,
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        marginTop: "20px",
                        cursor: "pointer"
                    }}
                    onClick={getNewQuote}
                >
                    New Quote
                </button>
            </div>
        </div>
    );
};

export default QuoteBox;
