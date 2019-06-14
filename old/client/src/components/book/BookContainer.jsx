import { Component } from "react";
import IframeBook from "./IframeBook";
import style from "StyleSheets/components/_book";
import { b64DecodeUnicode } from "utils/b64";
import classnames from "classnames";

class BookContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {[style.book]: true, [style.hide]: true}
        };
    }

    show = () => {
        this.setState(function (prevState, props) {
            prevState.classes[style.show] = true;
            prevState.classes[style.hide] = false;
            return {
                style: prevState.classes
            };
        });
    };

    render() {
        const classes = classnames(this.state.classes);
        return (
            <div id="test" className={classes} style={this.state.style} onClick={this.props.hide.bind(this, this.props.match.url)}>
                <IframeBook src={b64DecodeUnicode(this.props.match.params.bookSrc)} callback={this.show}/>
            </div>
        );
    }
}

export default BookContainer;
