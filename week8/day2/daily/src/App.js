import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import DatePicker from "./components/DatePicker";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
export default function App() {
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().slice(0, 10)
  );
  return (
    <Provider store={store}>
      <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Daily Planner</h1>
        <DatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <AddTaskForm selectedDay={selectedDay} />
        <TaskList selectedDay={selectedDay} />
      </div>
    </Provider>
  );
}
