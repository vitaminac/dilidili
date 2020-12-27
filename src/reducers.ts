import { combineReducers } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState } from "./shapes";
function changeTaskState(taskState: TaskState) {
  return (tasks: Task[], taskId: string): Task[] => {
    return tasks.map((task) =>
      task.id === taskId ? { ...task, state: taskState } : task
    );
  };
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    archiveTask(tasks: Task[], action: PayloadAction<string>) {
      return changeTaskState(TaskState.TASK_ARCHIVED)(tasks, action.payload);
    },
    pinTask(tasks: Task[], action: PayloadAction<string>) {
      return changeTaskState(TaskState.TASK_PINNED)(tasks, action.payload);
    },
  },
});

export default combineReducers({
  tasks: tasksSlice.reducer,
});
