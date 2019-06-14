import { PureComponent } from "react";

export default class ImageInput extends PureComponent {
    render() {
        return (
            <input style={this.props.style} type="image" src={this.props.src} name="load">
                {this.props.children}
            </input>
        );
    }
};
