import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "./redux/action";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  return (
    <div>
      <span
        onClick={() => dispatch(toggleTodo(todo.id))}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => dispatch(removeTodo(todo.id))}>❌</button>
    </div>
  );
}
