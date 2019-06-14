import Actions from "./index";

export default function allPlugins(plugins) {
    return {
        type: Actions.listPlugins,
        payload: plugins
    };
}
