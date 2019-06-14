import { PureComponent } from "react";
import style from "StyleSheets/components/_iframebook";

export default class IframeBook extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            style: {}
        };
    }

    toggleShow = () => {
        this.setState(function (prevState, props) {
            const style = Object.assign({}, prevState.style, {display: "block"});
            return {
                style: style
            };
        });
        this.props.callback();
    };

    render() {
        return (
            <iframe className={style.iframebook} src={this.props.src} style={this.state.style} onLoad={this.toggleShow}
                    sandbox>
            </iframe>
        );
    }
};
