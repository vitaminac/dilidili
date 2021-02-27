import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Banner, Task, TaskState, VideoDetail } from "./shapes";
import { fetchHotVideos, fetchBanners } from "./actions";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHotVideos.fulfilled, (state, action) => {
      action.payload.forEach(
        (videoDetail) => (state[videoDetail.videoId] = videoDetail)
      );
    });
  },
});

export const bannersSlice = createSlice({
  name: "banners",
  initialState: [] as Banner[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanners.fulfilled, (state, action) => {
      return state.concat(action.payload);
    });
  },
});
