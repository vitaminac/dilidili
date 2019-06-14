import BookContainer from "./BookContainer";
import { goBack } from "react-router-redux";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
    return {
        hide: function goParent(path) {
            dispatch(goBack(path));
        }
    };
}

export default connect(undefined, mapDispatchToProps)(BookContainer);
