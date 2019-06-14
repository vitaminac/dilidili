import $ from "jquery";
import updateScrollDirection from "../../epics/monitorScrollDirection";
import { store } from "../../store";

const dispatch = updateScrollDirection(store.dispatch);

export default function () {
    $(window).on("scroll", function (e) {
        dispatch(e);
    });
}
