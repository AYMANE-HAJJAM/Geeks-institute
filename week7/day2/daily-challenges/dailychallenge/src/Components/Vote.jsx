import React, { useState } from 'react'

export default function Vote() {
  const [languages, setLanguages] = useState([
    { name: "PHP", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);
  function handleClick(index) {
    setLanguages(prev =>
      prev.map((lang, i) =>
        i === index ? { ...lang, votes: lang.votes + 1 } : lang
      )
    );
  }
  return (
    <div>
      <h1>Vote Your Language!</h1>
      <div>
        {languages.map((lang, i) => (
          <h2
            key={i}
            style={{
              backgroundColor: "gray",
              paddingTop: "15px",
              width: "300px",
              marginBottom: "10px",
              borderRadius: "5px",
              padding: "10px",
              color: "white"
            }}
          >
            {lang.name}: {lang.votes}
            <button
              onClick={() => handleClick(i)}
              style={{
                color: "white",
                backgroundColor: "black",
                marginLeft: "50px",
                border: "none",
                padding: "5px 15px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Click here
            </button>
          </h2>
        ))}
      </div>
    </div>
  )
}
