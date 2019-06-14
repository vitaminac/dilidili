import { Component } from "react";
import { Link } from "react-router-dom";
import style from "StyleSheets/layout/header/_navigator";

export default class Navigator extends Component {
    render() {
        const obj = this.props.nav;
        return (
            <div className={style.navigator}>
                {
                    Object.keys(obj).map((key) => (
                        <Link key={key} className={style.link} to={obj[key].link}>{obj[key].name}</Link>
                    ))
                }
            </div>
        );
    }
}
