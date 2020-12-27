export enum TaskState {
  TASK_INBOX,
  TASK_PINNED,
  TASK_ARCHIVED,
}

export interface Task {
  /** Id of the task */
  readonly id: string;
  /** Title of the task */
  readonly title: string;
  /** Current state of the task */
  readonly state: TaskState;
  readonly updatedAt?: Date;
}

export interface ReduxStoreTree {
  tasks: Task[];
}
