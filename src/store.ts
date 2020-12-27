import { configureStore } from "@reduxjs/toolkit";
import { ReduxStoreTree, TaskState } from "./shapes";
import rootReducer from "./reducers";

const preloadedState: ReduxStoreTree =
  process.env.NODE_ENV === "production"
    ? {
        tasks: [],
      }
    : {
        tasks: [
          { id: "1", title: "Task 1", state: TaskState.TASK_INBOX },
          { id: "2", title: "Task 2", state: TaskState.TASK_PINNED },
          { id: "3", title: "Task 3", state: TaskState.TASK_ARCHIVED },
          { id: "4", title: "Task 4", state: TaskState.TASK_INBOX },
        ],
      };

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
  devTools: process.env.NODE_ENV !== "production",
});
