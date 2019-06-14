import { createElement } from "react";
import { Route } from "react-router";

function renderMergedProps(component, ...rest) {
    const finalProps = Object.assign({}, ...rest);
    return (
        createElement(component, finalProps)
    );
}

export default function PropsRoute({component, ...rest}) {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
}
