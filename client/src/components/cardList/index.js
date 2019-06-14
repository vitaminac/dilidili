import React from "react";
import subscribe from "../../hoc/subscribe";
import CardShow from "./cardShow/card-show";
import classesname from "classnames";
import style from "StyleSheets/components/_home";
import consts from "abstracts/consts";
import bookSelector from "../../selectors/selectBookList";

// A simple component that shows the pathname of the current location
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.observableName = props.match.params.path;
        this.WithSubscribed = subscribe(bookSelector,
            (observable) => observable.map((x) => [x]),
            (prevdata, data) => {
                return prevdata.concat(data);
            },
            () => [],
            undefined,
            "list"
        )(CardShow);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.path !== this.observableName) {
            this.WithSubscribed = subscribe("ddcat", nextProps.match.params.path,
                (observable) => observable.map((x) => [x]),
                (prevdata, data) => {
                    return prevdata.concat(data);
                },
                () => [],
                undefined,
                "list"
            )(CardShow);
        }
    }

    render() {
        const WithSubscribed = this.WithSubscribed;
        const {history, location, match, path, ...passThrough} = this.props;
        console.log(this.props.location.pathname.replace(this.props.match.url, "").replace(/\//g, ""), this.props);
        passThrough["className"] = classesname(
                {
                    [style.ishidden]: this.props.location.pathname.replace(this.props.match.url, "").replace(/\/g/, "").length
                }) || consts.defaultClassName;
        return (
            <WithSubscribed {...passThrough}/>
        );
    }
}

export default Home;
