import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { ReduxStoreTree, TaskState } from "./shapes";
import { tasksSlice, videosSlice, bannersSlice } from "./slices";

const preloadedState: ReduxStoreTree =
  process.env.NODE_ENV === "production"
    ? {
        tasks: [],
        videos: {},
        banners: [],
      }
    : {
        tasks: [
          { id: "1", title: "Task 1", state: TaskState.TASK_INBOX },
          { id: "2", title: "Task 2", state: TaskState.TASK_PINNED },
          { id: "3", title: "Task 3", state: TaskState.TASK_ARCHIVED },
          { id: "4", title: "Task 4", state: TaskState.TASK_INBOX },
        ],
        videos: {},
        banners: [],
      };

export const store = configureStore({
  reducer: combineReducers({
    tasks: tasksSlice.reducer,
    videos: videosSlice.reducer,
    banners: bannersSlice.reducer,
  }),
  preloadedState: preloadedState,
  devTools: process.env.NODE_ENV !== "production",
});
