import { PureComponent } from "react";

export default class FileInput extends PureComponent {
    constructor(props) {
        super(props);
        this.style = Object.assign({}, this.props.style, {
            "opacity": "0",
            "zIndex": "2"
        });
        this.state = {
            value: ""
        };
    }

    readText = (e) => {
        if (e.target.value) {
            const cacheThis = this;
            const fileName = e.target.value;
            const file = e.target.files[0];
            const fr = new FileReader();
            fr.onload = function () {
                cacheThis.props.callback(fr.result);
            };
            fr.readAsText(file);
            console.log("reading from ", fileName);
            this.setState({
                value: ""
            });
        }
    };

    render() {
        return (
            <input value={this.state.value} style={this.style} type="file" accept=".xml,.sited" onChange={this.readText}>
                {this.props.children}
            </input>
        );
    }
}
