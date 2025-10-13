import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
export default function TodoList() {
  const todos = useSelector((state) => state.todos);

  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos yet...</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
}
