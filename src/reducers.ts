import { combineReducers } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState, VideoDetail } from "./shapes";

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

export const videosSlice = createSlice({
  name: "videos",
  initialState: {} as Record<number, VideoDetail>,
  reducers: {
    mergeVideos(
      videos: Record<number, VideoDetail>,
      action: PayloadAction<VideoDetail[]>
    ) {
      return {
        ...videos,
        ...action.payload.reduce(
          (obj, item) => Object.assign(obj, { [item.videoId]: item }),
          {}
        ),
      };
    },
  },
});

export default combineReducers({
  tasks: tasksSlice.reducer,
  videos: videosSlice.reducer,
});
