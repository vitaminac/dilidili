/** Composition of the task */
export default interface Task {
  /** Id of the task */
  readonly id: string;
  /** Title of the task */
  readonly title: string;
  /** Current state of the task */
  readonly state: string;
  readonly updatedAt?: Date;
}
