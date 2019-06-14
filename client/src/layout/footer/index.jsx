import { Component } from "react";
import style from "StyleSheets/layout/_footer";

export default class Footer extends Component {
    render() {
        const obj = this.props.nav;
        return (
            <footer className={style.footer}>
                <ul>
                    {Object.keys(obj).map((key) => (
                        <li key={key}>
                            <a href={obj[key].link}>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox={obj[key].viewBox}>
                                <path d={obj[key].path}/>
                                </svg>
                            </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </footer>
        );
    }
}
