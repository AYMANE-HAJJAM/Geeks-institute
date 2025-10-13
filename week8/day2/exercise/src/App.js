import React from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1> My Redux Todo List</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}
