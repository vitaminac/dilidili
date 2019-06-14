import React from "react";
import FileInput from "./FileInput";
import ImageInput from "./ImageInput";

class FileImageInputButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.style = {
            "width": "50px",
            "height": "50px",
            "position": "fixed",
            "top": "0",
            "right": "0",
            "zIndex": 999
        };
        this.childStyle = {
            "position": "absolute",
            "top": "0",
            "right": "0",
            "width": "100%",
            "height": "100%",
            "display": "block"
        };
    }

    render() {
        return (
            <div style={this.style}>
                <FileInput callback={this.props.callback} style={this.childStyle}/>
                <ImageInput style={this.childStyle} src={this.props.src}/>
            </div>
        );
    }
}

export default FileImageInputButton;
