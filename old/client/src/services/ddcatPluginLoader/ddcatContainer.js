import { Observable } from "rxjs";
import DDCatPluginContainer from "./pluginContainer";

export default class DDCatContainer {
    constructor(prevPlugins = []) {
        this.restorePlugins(prevPlugins);
        this.plugins = {};
    }

    restorePlugins(prevPlugins) {
        if (Array.isArray(prevPlugins)) {
            prevPlugins.forEach((plugin) => {
                this.installNewPlugin(plugin);
            });
        }
    }

    * [Symbol.iterator]() {
        for (let [key, value] of Object.entries(this.plugins)) {
            yield value;// single plugin
        }
    }

    installNewPlugin = (plugin) => {
        const ddcatContainer = new DDCatPluginContainer(plugin);
        this.plugins[ddcatContainer.title] = ddcatContainer;
    };

    getData(pluginName, nodeName, key) {
        // this.plugins["動漫狂"].getnode("hots");
        return Observable.create(function (observer) {
            Observable.from(json).subscribe((x) => {
                observer.next(x);
            });
        });
    }
}
