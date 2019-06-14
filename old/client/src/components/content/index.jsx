import { Component } from "react";

export default class Content extends Component {
    render() {
        return (
            <article>
                {this.props.children}
            </article>
        );
    }
}
