import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTask, deleteTask } from "../redux/taskSlice";
export default function TaskList({ selectedDay }) {
  const dispatch = useDispatch();
  const tasks = useSelector(
    (state) => state.tasks.tasksByDay[selectedDay] || []
  );
  const [editText, setEditText] = useState("");

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Tasks for {selectedDay}</h2>
      {tasks.length === 0 && <p>No tasks for this day.</p>}
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-2 mb-2">
          <span>{task.text}</span>
          <button
            className="bg-blue-500 text-white px-2 rounded"
            onClick={() => {
              const newText = prompt("Edit task:", task.text);
              if (newText) {
                dispatch(editTask({ day: selectedDay, taskId: task.id, newText }));
              }
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 rounded"
            onClick={() =>
              dispatch(deleteTask({ day: selectedDay, taskId: task.id }))
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
