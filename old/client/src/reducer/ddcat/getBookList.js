import Actions from "../../actions/index";
import createSource from "../../actions/createSource";
import * as Immutable from "immutable";

const initialState = Immutable.Map({"home": createSource("home")});

export default function getBookList(state = initialState, action) {
    switch (action.type) {
        case Actions.changeSource:
            return state.set(action.observable, action.source);
        default:
            return state;
    }
}
