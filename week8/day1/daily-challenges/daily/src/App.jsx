import React from "react";
import { TaskProvider } from "./TaskContext";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
export default function App() {
  return (
    <TaskProvider>
      <div style={{ width: "400px", margin: "50px auto", textAlign: "center" }}>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
