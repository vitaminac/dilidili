import changeScrollDirection from "../actions/changeScrollDirection";
import scrollUpDown from "../transformer/scrollBar";
import epic from "./index";

export default function updateScrollDirection(dispatch) {
    return epic(dispatch, function (action$) {
        return scrollUpDown(action$).map((direction) => changeScrollDirection(direction));
    });
}
