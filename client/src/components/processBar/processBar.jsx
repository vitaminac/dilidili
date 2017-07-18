import { PureComponent } from "react";
import style from "StyleSheets/components/_processbar";

export default class ProcessBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                width: "100%"
            }
        };
    }

    render() {
        return (
            <div className={style.processbar} style={{zIndex: 8}}>
                <div className={style.hideprocessbar} style={this.state.style}>
                </div>
            </div>
        );
    }
}
