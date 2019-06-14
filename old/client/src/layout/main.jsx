import { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import BookContainer from "../components/book/";
import { Route, withRouter } from "react-router";
import footerNav from "../abstracts/info/footer";
import headerNav from "../abstracts/info/header";
import PropTypes from "prop-types";
import style from "StyleSheets/layout/_mainLayout";
import theme from "StyleSheets/themes/_light";
import classesname from "classnames";
import Article from "./article";
import FileImageInputButton from "../components/button/FileImageInputButton/FileImageInputButton";
import ddcatPluginLoader from "../services/ddcatPluginLoader";
import ProcessBar from "../components/processBar/processBar";

class MainLayout extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const url = this.props.match.url;
        const classes = classesname(style.mainlayout, theme.light);
        return (
            <div className={classes}>
                <ProcessBar />
                <Header nav={headerNav}/>
                <Article />
                <Footer nav={footerNav}/>
                <Route path={`${url}/:path/:bookSrc`} component={BookContainer}/>
                <FileImageInputButton src="https://cdn2.iconfinder.com/data/icons/music-bento/100/stop-512.png" callback={
                    ddcatPluginLoader.installNewPlugin
                }/>
            </div>
        );
    }
}

export default withRouter(MainLayout);
