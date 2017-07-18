import Immutable from "immutable";
import Actions from "../../actions";
import { ScrollDirection } from "../../actions/immutableProps";

const initialState = Immutable.Map({[ScrollDirection]: "up"});

export default function scroll(state = initialState, action) {
    switch (action.type) {
        case Actions.changeScrollDirection:
            return state.set(ScrollDirection, action.payload);
        default:
            return state;
    }
}
