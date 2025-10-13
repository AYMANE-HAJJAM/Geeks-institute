import React, { useRef, useState, useEffect } from "react";

function CharacterCounter() {
    const inputRef = useRef();
    const [count, setCount] = useState(0);

    useEffect(() => {
        const handleInput = () => {
            setCount(inputRef.current.value.length);
        };

        const inputEl = inputRef.current;
        inputEl.addEventListener("input", handleInput);

        return () => {
            inputEl.removeEventListener("input", handleInput);
        };
    }, []);

    return (
        <div style={{
            textAlign: "center",
            marginTop: "100px",
            fontFamily: "Poppins, sans-serif",
        }}>
            <h2>📝 Character Counter</h2>
            <input
                ref={inputRef}
                type="text"
                placeholder="Type something..."
                style={{
                    padding: "10px",
                    fontSize: "18px",
                    width: "250px",
                    borderRadius: "10px",
                    border: "2px solid #aaa",
                }}
            />
            <p style={{ fontSize: "20px", marginTop: "10px" }}>
                Characters: {count}
            </p>
        </div>
    );
}

export default CharacterCounter;
    