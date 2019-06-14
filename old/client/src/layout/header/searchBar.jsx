import { Component } from "react";
import style from "StyleSheets/layout/header/_searchbar";

export default class SearchBar extends Component {
    render() {
        return (
            <div className={style.searchbar}>
                    <span>
                         <img src="./image/search.png"/>
                         <span className="search-input-edge"/>
                         <input className="search-input"/>
                         <span className="search-input-edge"/>
                     </span>
                <ul className="search-result" style={{display: "none"}}>
                </ul>
            </div>
        );
    }
}
