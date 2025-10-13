import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
export default function TaskList() {
  const { state, dispatch } = useContext(TaskContext);
  const { tasks, filter } = state;
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true; 
  });
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => dispatch({ type: "FILTER_TASKS", payload: "all" })}>All</button>
        <button onClick={() => dispatch({ type: "FILTER_TASKS", payload: "active" })} style={{ marginLeft: "5px" }}>Active</button>
        <button onClick={() => dispatch({ type: "FILTER_TASKS", payload: "completed" })} style={{ marginLeft: "5px" }}>Completed</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.length === 0 ? <p>Aucune tâche</p> : filteredTasks.map(task => <TaskItem key={task.id} task={task} />)}
      </ul>
    </div>
  );
}
