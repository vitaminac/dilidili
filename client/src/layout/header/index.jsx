import { Component } from "react";
import style from "StyleSheets/layout/header/_header";
import Navigator from "./nav";
import classesname from "classnames";
import SearchBar from "./searchBar";
import { connect } from "react-redux";
import { ScrollDirection } from "../../actions/immutableProps";

@connect((state) => {
    return {ScrollDirection: state.ui.get(ScrollDirection)};
})
export default class Header extends Component {
    render() {
        const classes = classesname(style.header, {[style.ishidden]: this.props.ScrollDirection !== "up"});
        return (
            <header className={classes}>
                <Navigator nav={this.props.nav}/>
                <SearchBar />
            </header>
        );
    }
}
