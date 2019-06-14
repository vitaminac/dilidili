import React from "react";
import consts from "abstracts/consts";

class Body extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}
Body.defaultProps = {
    className: consts.defaultClassName
};

export default Body;
