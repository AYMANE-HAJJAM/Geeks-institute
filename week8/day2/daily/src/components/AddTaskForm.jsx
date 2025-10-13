import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

export default function AddTaskForm({ selectedDay }) {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!taskText.trim()) return;
    const newTask = { id: Date.now(), text: taskText };
    dispatch(addTask({ day: selectedDay, task: newTask }));
    setTaskText("");
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={taskText}
        placeholder="New task..."
        onChange={(e) => setTaskText(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Add
      </button>
    </div>
  );
}
