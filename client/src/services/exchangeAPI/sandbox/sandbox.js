import $ from "jquery";

export default class Sandbox {
    constructor(plugin) {
        // unique id for detecting iframe
        this.sandboxID = `sandbox${Math.random() * Math.pow(10, Math.random().toString().length)}${new Date().getTime()}`;
        this.executionSchedule = {};
        this.startMonitoring();
        const pluginScript = `<script>const print = console.log;${(plugin && plugin.toString()) || ""};</script>`;
        const monitorService = `function ${this.receiveMessage.toString()};`;
        const startMonitoring = `(function(){window.sandboxID="${this.sandboxID}";window.addEventListener("message", receiveMessage);})();`;
        const serviceScript = `<script>${monitorService}${startMonitoring}</script>`;
        const html = `<html><head>${pluginScript}${serviceScript}</head><body></body></html>`;
        const blob = new Blob([html], {type: "text/html"});
        const url = URL.createObjectURL(blob);
        $("<iframe>", {id: this.sandboxID, src: url, style: "display:none", sandbox: "allow-scripts"}).appendTo($("body"));
    }

    receiveMessage(event) {
        const global = window;
        const action = event.data;
        // Do we trust the sender of this message?  (might be
        // different from what we originally opened, for example).
        console.log(event);
        if (action.sandboxID === this.sandboxID) {
            const getUserDefinedFunction = () => {
                return Object.keys(global).filter(function (props) {
                    try {
                        return global[props] instanceof Function && !/\[(native code)|(Command Line API)\]/.test(global[props].toString());
                    } catch (e) {
                        if (!(e instanceof DOMException)) {
                            throw e;
                        }
                    }
                });
            };
            const actionsType = {
                execute: "execute",
                returnResult: "returnResult",
                syncFunction: "syncFunction"
            };
            const reply = (messageType, payload) => {
                const response = {
                    sandboxID: action.sandboxID,
                    actionID: action.actionID,
                    type: messageType,
                    payload: payload
                };
                event.source.postMessage(response, event.origin);
            };
            const syncFunction = (event) => {
                reply(actionsType.syncFunction, getUserDefinedFunction());
            };

            switch (action.type) {
                case actionsType.execute:
                    if (global.sandboxID && global.sandboxID === action.sandboxID) {
                        const payload = {
                            result: false,
                            error: true
                        };
                        try {
                            payload.result = JSON.stringify(eval.call(window, action.payload));
                            payload.error = false;
                        } catch (e) {
                            payload.result = e.toString();
                        } finally {
                            reply(actionsType.returnResult, payload);
                            syncFunction(event);
                        }
                    }
                    break;
                case actionsType.returnResult:
                    if (action.payload.error) {
                        action.payload.error = new Error(action.payload.result);
                    }
                    let result = action.payload.result;
                    this.executionSchedule[action.actionID].callback(result, action.payload.error);
                    break;
                case actionsType.syncFunction:
                    const self = this;
                    action.payload.forEach(function (functionName) {
                        if (!Reflect.get(self, functionName)) {
                            Reflect.set(self, functionName, self.generaetFunctionProxy(functionName));
                        }
                    });
                    break;
                default:
            }
        }
    };

    startMonitoring() {
        window.addEventListener("message", this.receiveMessage.bind(this));
    }

    generaetFunctionProxy(functionName) {
        return async function proxy(...rest) {
            return this.execute(`${functionName}(${JSON.stringify(rest).slice(1, -1)})`);
        };
    }

    execute(jscode, callback) {
        if (callback && !$.isFunction(callback)) {
            throw new Error("callback need to be a function");
        }
        if ($.isFunction(jscode)) {
            jscode = jscode.toString();
        }
        return new Promise((resolve, reject) => {
            if (typeof jscode === "string" || $.isFunction(jscode)) {
                const actionID = new Date().getTime();
                this.executionSchedule[actionID] = {
                    callback: callback || ((result, error) => {
                        console.log("didnt specify the callback function, the result was " + result);
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    })
                };
                $(`#${this.sandboxID}`)[0].contentWindow.postMessage({
                    sandboxID: this.sandboxID,
                    actionID: actionID,
                    type: "execute",
                    payload: jscode
                }, "*");
            }
        });
    }
}
