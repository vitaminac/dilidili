import { Component } from "react";
import Home from "../../components/cardList";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { connect } from "react-redux";
import updateScrollDirection from "../../epics/monitorScrollDirection";
import wrap from "../../hoc/wrapper";

@wrap(withRouter)
@connect(undefined, (dispatch) => ({
    updateScrollDirection: updateScrollDirection(dispatch)
}))
export default class Article extends Component {
    render() {
        const url = this.props.match.url;
        return (
            <article onScroll={this.props.updateScrollDirection}>
                <Switch>
                    <Route exact={true} strict={true} path={`${url}/:id`} render={(props) => (<Redirect to={`${props.match.params.sandboxID}/`}/>)}/>
                    <Route exact path={`${url}`} render={() => (<Redirect to={`${url}home/`}/>)}/>
                    <Route strict={true} path={`${url}/:path/`} component={Home}/>
                </Switch>
            </article>
        );
    }
}
