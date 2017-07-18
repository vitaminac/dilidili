import Actions from "../../actions";
import Immutable from "immutable";

const initialState = Immutable.Map({});

export default function availablePlugin(state = initialState, action) {
    switch (action.type) {
        case Actions.listPlugins:
            return state.set(Actions.listPlugins, action.payload);
        default:
            return state;
    }
}
