import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

import { WithPinnedTask } from "./TaskList.stories";
import { WithPinnedTaskProps } from "./TaskList.stories.examples";

it("renders pinned tasks at the start of the list", () => {
  const div = document.createElement("div");
  // Our story will be used for the test.
  // With the arguments that were created.
  ReactDOM.render(<WithPinnedTask {...WithPinnedTaskProps} />, div);

  // We expect the task titled "Task 6 (pinned)" to be rendered first, not at the end
  const lastTaskInput = div.querySelector(
    '.list-item:nth-child(1) input[value="Task 6 (pinned)"]'
  );
  expect(lastTaskInput).not.toBe(null);

  ReactDOM.unmountComponentAtNode(div);
});
