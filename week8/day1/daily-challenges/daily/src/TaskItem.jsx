import React, { useContext, useState, useRef } from "react";
import { TaskContext } from "../context/TaskContext";
export default function TaskItem({ task }) {
  const { dispatch } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current.focus(), 0); 
  };

  const handleSave = () => {
    dispatch({ type: "EDIT_TASK", payload: { id: task.id, text: inputRef.current.value } });
    setIsEditing(false);
  };
  return (
    <li style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
      {isEditing ? (
        <>
          <input ref={inputRef} defaultValue={task.text} style={{ flex: 1, padding: "5px" }} />
          <button onClick={handleSave} style={{ marginLeft: "5px" }}>Save</button>
        </>
      ) : (
        <>
          <span
            onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              flex: 1,
              cursor: "pointer",
            }}
          >
            {task.text}
          </span>
          <button onClick={handleEdit} style={{ marginLeft: "5px" }}>Edit</button>
          <button onClick={() => dispatch({ type: "REMOVE_TASK", payload: task.id })} style={{ marginLeft: "5px", color: "red" }}>Supprimer</button>
        </>
      )}
    </li>
  );
}
