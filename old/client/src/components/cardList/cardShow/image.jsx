import React from "react";

class Image extends React.PureComponent {
    changeParentWidth = (width) => {
        this.props.callback(this.img.naturalWidth);
    };

    render() {
        return (
            <img onLoad={this.changeParentWidth} ref={(img) => {
                this.img = img;
            }} src={this.props.src} alt="loading"/>
        );
    }
}

export default Image;
