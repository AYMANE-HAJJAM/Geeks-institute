import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";
export default function TaskItem({ task }) {
  const { dispatch } = useContext(TaskContext);
  return (
    <li style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
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
      <button
        onClick={() => dispatch({ type: "REMOVE_TASK", payload: task.id })}
        style={{ marginLeft: "10px", color: "red" }}
      >
        Supprimer
      </button>
    </li>
  );
}
