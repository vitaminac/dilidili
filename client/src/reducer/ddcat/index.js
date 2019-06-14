import { combineReducers } from "redux";
import Booklist from "./getBookList";
import pluginList from "./availablePlugin";

export default combineReducers({
    Booklist,
    pluginList
});
