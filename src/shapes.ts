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

export interface VideoDetail {
  title: string;
  cover: string;
  uploader: string;
  playCount: number;
  videoId: number;
}

export interface ReduxStoreTree {
  tasks: Task[];
  videos: Record<number, VideoDetail>;
}
