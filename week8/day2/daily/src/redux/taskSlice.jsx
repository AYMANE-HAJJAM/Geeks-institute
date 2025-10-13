import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasksByDay: {}, 
  },
  reducers: {
    addTask: (state, action) => {
      const { day, task } = action.payload;
      if (!state.tasksByDay[day]) {
        state.tasksByDay[day] = [];
      }
      state.tasksByDay[day].push(task);
    },
    editTask: (state, action) => {
      const { day, taskId, newText } = action.payload;
      const dayTasks = state.tasksByDay[day];
      const task = dayTasks.find((t) => t.id === taskId);
      if (task) task.text = newText;
    },
    deleteTask: (state, action) => {
      const { day, taskId } = action.payload;
      state.tasksByDay[day] = state.tasksByDay[day].filter(
        (t) => t.id !== taskId
      );
    },
  },
});
export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
