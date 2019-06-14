import { createSelector } from "reselect";

const ddcatPluginSelector = state => state.ddcat;

const bookListSelector = createSelector(
    ddcatPluginSelector,
    (ddcat) => ddcat.Booklist.get("home")
);

export default bookListSelector;
