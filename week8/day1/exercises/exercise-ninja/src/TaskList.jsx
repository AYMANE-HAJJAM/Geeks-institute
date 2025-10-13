import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";
import TaskItem from "./TaskItem";
export default function TaskList() {
  const { tasks } = useContext(TaskContext);
  if (tasks.length === 0) return <p>Aucune tâche pour le moment.</p>;
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
