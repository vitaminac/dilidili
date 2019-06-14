import Actions from "./index";

export default function updateScrollDirection(direction) {
    return {
        type: Actions.changeScrollDirection,
        payload: direction
    };
}
