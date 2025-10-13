import React, { useState, useContext } from "react";
import { TaskContext } from "./TaskContext";
export default function AddTask() {
  const { dispatch } = useContext(TaskContext);
  const [text, setText] = useState("");
 const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TASK", payload: text });
    setText("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ajouter une tâche..."
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button onClick={handleAdd} style={{ marginLeft: "10px" }}>Ajouter</button>
    </div>
  );
}
