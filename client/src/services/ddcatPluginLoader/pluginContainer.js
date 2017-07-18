import Q from "q";
import { concatNarrays, getCurrentUrl, getPageCookieReference, getPageText, saveToLocal, trace } from "../exchangeAPI";
import $ from "jquery";
import AbstractedPluginContainer from "./abstractedPluginContainer";
import Sandbox from "../exchangeAPI/sandbox/sandbox";

class DDCatPluginContainer extends AbstractedPluginContainer {
    constructor(plugin, debug) {
        super();
        this.plugin = plugin;
        this.init();
        this._config = {};
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            get: this.getCurrentConfig,
            set: this.syncCurrentConfig
        });
        if (debug) {
            this.enableDebugMode();
        }
    }

    get plugin() {
        return this._$pluginXMLDoc;
    }

    set plugin(plugin) {
        const xmlDoc = jQuery.parseXML(plugin);
        const $xml = $(xmlDoc);
        try {
            this.tryLoadPluginJSCode($xml);
            this._$pluginXMLDoc = $xml;
        } catch (e) {
            console.log(e, " plugin is not installed");
        }
    }

    tryLoadPluginJSCode($plugin) {
        const cacheThis = this;
        try {
            // 认不出 strict
            const code = $plugin.xpath("(/site/(jscript | script))[position()=1]").text().trim().replace(/"\s*use\s+strict\s*"\s*;/g, "");
            try {
                this.sandbox = new Sandbox(code);
            } catch (e) {
                console.log("javascript run-time compile error");
                throw e;
            }
        } catch (e) {
            console.log(e);
            throw {message: "插件不是正确的格式"};
        }
    };

    init() {
        this.title = this.plugin.xpath("//title[position()=1]").text();
        this.expr = this.plugin.xpath("//expr[position()=1]").text();
    }

    initialize() {
        const expr = this.plugin.xpath("/site/main//*[@url or @expr]");
        const listOfMatch = [];
        expr.each(function (i, e) {
            let re;
            if ($(e).attr("url")) {
                re = new RegExp("^" + $(e).attr("url").replace(/&amp;/g, "&").replace(/([.\\/?])/g, "\\$1").replace("@page", "\\d+").replace("@key", ".*") + "/*$", "i");
            } else if ($(e).attr("expr")) {
                re = new RegExp($(e).attr("expr"));
            } else {
                console.log(e, "does'n seem to be a right NodeSet");
            }
            if (window.location.toString().match(re)) {
                listOfMatch.push({regex: re, element: e});
            }
        });
        console.log("this sited could be one of the following ", listOfMatch);
        let maxItem = {length: 0};
        $.each(listOfMatch, function (i, item) {
            if (item.regex.toString().length > maxItem.length) {
                maxItem = item;
                maxItem.length = item.regex.toString().length;
            }
        });
        console.log("current node position is", maxItem);
        if (maxItem.element) {
            return this.buildNodeConfig(maxItem.element);
        }
    }

    getNode(nodeName) {

    }
}

DDCatPluginContainer.prototype.exec = function (command) {
    this.eventBus.emit(command);
};
DDCatPluginContainer.prototype.saveConfig = function () {
    console.log("saving config");
    saveToLocal("ddcatConfig", this._configs);
};
DDCatPluginContainer.prototype.loadConfigs = function (configs) {
    if (typeof configs === "object") {
        Object.assign(this._configs, configs);
        this.eventBus.emit("loadedConfigs");
    } else {
        console.log(configs, " is not a valid saved configs file");
    }
};
DDCatPluginContainer.prototype.enableDebugMode = function enableDebugMode() {
    // trace log each prototype functions
    for (let e in this.constructor.prototype) {
        if (this.constructor.prototype.hasOwnProperty(e) && typeof this.constructor.prototype[e] === "function" && this.constructor.prototype[e] !== enableDebugMode.name.toString()) {
            this[e] = trace()(this.constructor.prototype[e]);
        }
    }
};
DDCatPluginContainer.prototype.redirect = function (option, config) {
    const method = option.method || config.method || "GET";
    if (option.url) {
        alert("starts redirection, jump to " + option.url + " with " + option.method + " " + option.body);
        try {
            $.redirect(option.url, option.body || "", method, "_blank");
        } catch (e) {
            console.log(e, [option.url, option.body || "", option.method || config.method || "GET", "_blank"]);
        }
    }
};
DDCatPluginContainer.prototype.parseQueryString = function parseQueryStringb(search) {
    let json = {};
    search.split(";").forEach(function (pair) {
        let [k, v] = pair.split("=");
        json[k] = v;
    });
    return json;
};
DDCatPluginContainer.prototype.getFirstLevelHostName = function () {
    let hostname = location.hostname;
    return hostname.replace("www.", "");
};
DDCatPluginContainer.prototype.updateCookie = function updateCookie(newCookie, config) {
    const cacheThis = this;
    this.removeAllCookie(config);
    newCookie.split(";").forEach(function (currentValue) {
        config.cookies = currentValue + ";path=/;domain=" + cacheThis.getFirstLevelHostName();
    });
};
DDCatPluginContainer.prototype.removeAllCookie = function (config) {
    const cacheThis = this;
    config.cookies.split(";").forEach(function (currentValue, index, array) {
        config.cookies = currentValue + ";expires=" + new Date().toGMTString() + ";path=/;domain=" + cacheThis.getFirstLevelHostName();
    });
};
DDCatPluginContainer.prototype.prepareNewRequsts = function prepareNewRequsts(urlCallSet, config) {
    const cacheThis = this;
    return urlCallSet.map(function (callUrl) {
        const parseUrlResult = callUrl.split("::");
        const request = {};
        const header = new Headers();
        let newMethod = "";
        let newUrl = callUrl;
        let args = "";
        if (parseUrlResult.length > 1) {
            newUrl = parseUrlResult[parseUrlResult.length - 1];
            if (parseUrlResult.length > 2) {
                newMethod = parseUrlResult[parseUrlResult.length - 2];
            }
        } else {
            newUrl = parseUrlResult[0];
        }
        if (config.buildUrl) {
            newUrl = config.buildUrl(newUrl);
        }
        if (config.buildArgs) {
            const newArgs = config.buildArgs(newUrl);
            if (newArgs) {
                args += newArgs;
                // args = parseQueryString(args);
                // request.body = JSON.stringify(args);
                request.body = args.replace(/;/g, "&");
            }
        }
        if (config.buildRefer) {
            header.set("Referer", config.buildRefer(newUrl));
        }
        if (config.buildHeader) {
            let k, v;
            let newHeader = config.buildHeader(newUrl);
            if (!newHeader.includes("$$")) {
                newHeader.replace(/;/g, "$$$$");
                newHeader = newHeader.replace(/=/g, ":");
            }
            newHeader.split("$$").forEach(function (x) {
                if (x) {
                    [k, v] = x.split(":");
                    header.append(k.trim(), (v && v.trim()) || "");
                } else {
                    console.log("warning header is null and buildHeader is enable");
                }
            });
        }
        if (config.buildCookie) {
            let cookie = config.buildCookie(newUrl, config.cookies);
            cacheThis.updateCookie(cookie, config);
            request.credentials = "same-origin";
        }
        request.url = newUrl;
        request.method = newMethod || config.method;
        request.headers = header;
        return request;
    });
};
DDCatPluginContainer.prototype.parseUrl = function (url, html, config) {
    const cacheThis = this;
    let promises;
    let parseUrlResultSet;
    let parseUrlResult;
    let deferred = Q.defer();
    if (config.parseUrl) {
        parseUrlResult = config.parseUrl(url, html);
        if (parseUrlResult) {
            parseUrlResultSet = parseUrlResult.split(";");
        }
    }
    if (parseUrlResultSet && (parseUrlResultSet.length > 1 || parseUrlResultSet[0] !== url)) {
        promises = this.prepareNewRequsts(parseUrlResultSet, config).map(function (option, index) {
            return fetch(option.url, option).then(function (response) {
                if (parseUrlResultSet[index].toUpperCase().startsWith("CALL")) {
                    return cacheThis.parseUrl(response.url, response.Body, config);
                } else {
                    return [{url: response.url, body: response.Body}];
                }
            }, function (reason) {
                console.log(reason);
                return [{url: url, body: html}];
            });
        });
    }
    if (promises && Array.isArray(promises) && promises.length > 0) {
        Q.allSettled(promises).then(function (results) {
            const r = concatNarrays(...results.map(function (result) {
                if (result.state === "fulfilled") {
                    return result.value;
                } else {
                    console.log(result);
                }
            }).filter(function (result) {
                return result;
            }));
            deferred.resolve(r);
        });
    } else {
        deferred.resolve([{url: url, body: html}]);
    }
    return deferred.promise;
};
DDCatPluginContainer.prototype.firstStep = function parseResult(config) {
    const cacheThis = this;
    this.parseUrl(config.url, config.html, config)
    .then(function (results) {
        let listObj = [];
        results.forEach(function (result) {
            try {
                const obj = JSON.parse(config.parse(result.url, result.body));
                if (Array.isArray(obj)) {
                    listObj = listObj.concat(obj);
                } else {
                    listObj.push(obj);
                }
            } catch (e) {
                console.log(e);
            }
        });
        return listObj;
    }, function (reason) {
        console.log(reason, "something went wrong at parseUrl");
        throw reason;
    })
    .then(function (listOfObj) {
        console.log(listOfObj);
        let nextStep = cacheThis.jumpToTarget.bind(cacheThis, cacheThis.config, listOfObj);
        cacheThis.eventBus.off("jump");
        cacheThis.eventBus.once("jump", nextStep);
    }).done();
};
DDCatPluginContainer.prototype.jumpToTarget = function finalStepd(config, listOfObj) {
    const cacheThis = this;
    let option;
    try {
        listOfObj.forEach(function (obj) {
            if (typeof obj === "string") {
                option = {url: obj};
                cacheThis.redirect(option, config);
            } else {
                if (obj.url) {
                    option = {url: obj.url};
                    cacheThis.redirect(option, config);
                }
                if (obj.sections) {
                    cacheThis.jumpToTarget(config, obj.sections);
                }
            }
        });
    } catch (e) {
        console.log(e, option);
        throw e;
    }
};
DDCatPluginContainer.prototype.resume = function () {
    this.eventBus.emit("resume");
};
DDCatPluginContainer.prototype.addFunc = function (func, functionName) {
    if (typeof func === "function") {
        this[func.name || functionName] = func;
    }
};
DDCatPluginContainer.prototype.restart = function () {
    if (typeof this.firstStep === "function") {
        const cacheThis = this;
        this.eventBus.once("resume", function () {
            cacheThis.firstStep(cacheThis.config);
        });
    } else {
        console.log(this.firstStep, " is not a function");
    }
};
DDCatPluginContainer.prototype.setDefaultMethod = function (method) {
    this.config.method = method;
};
DDCatPluginContainer.prototype.setParseMethod = function (parserType, parser) {
    console.log("you are setting ", parserType, " as ", parser);
    if ((typeof parser === "function") || (typeof parser === "string")) {
        return trace()(globalContext[parser] || eval("(function(){return " + parser + "})()"), this);
    } else {
        console.log("wrong function ", parser);
    }
};
DDCatPluginContainer.prototype.changeParseMethod = function (parserType, parser) {
    throw "not implements";
};
DDCatPluginContainer.prototype.updateCurrentConfig = function (newConfig) {
    if (newConfig) {
        Object.assign(this._config || {}, newConfig);
    }
};
DDCatPluginContainer.prototype.getCurrentConfig = function () {
    if ((Object.keys(this._config).length === 0)) {
        this.syncCurrentConfig();
    }
    return this._config;
};
DDCatPluginContainer.prototype.syncCurrentConfig = function () {
    let config = this.matchCurrentSite(getCurrentUrl(), this._configs);
    if (config) {
        this.updateCurrentConfig(config);
        this.eventBus.emit("buildNodeConfigCompleted");
    }
};
DDCatPluginContainer.prototype.matchCurrentSite = function (cuurentUrl, configs) {
    for (let e in configs) {
        if (configs.hasOwnProperty(e) && configs[e].expr) {
            try {
                let re = new RegExp(this._configs[e].expr, "i");
                if (cuurentUrl.match(re)) {
                    let xmlDoc = $.parseXML(this._configs[e].sited);
                    let $xml = $(xmlDoc);
                    console.log("matchs ", e);
                    this.tryLoadPluginJSCode($xml);
                    return this.generateConfig($xml);
                }
                console.log(re);
            } catch (e) {
                console.log(e);
            }
        }
    }
};
DDCatPluginContainer.prototype.buildNodeConfig = function (NodeSet) {
    const cacheThis = this;
    const currentConfig = {};
    $(NodeSet).xpath("ancestor-or-self::*").each(function (i, parent) {
        Object.assign(currentConfig, cacheThis.generateAttrNode(parent));
    });
    currentConfig.subConfigs = this.buildChildrenConfig(NodeSet);
    if (currentConfig) {
        currentConfig.cookies = getPageCookieReference();
        currentConfig.url = getCurrentUrl();
        currentConfig.html = getPageText();
        console.log(currentConfig);
    } else {
        console.log("some error had happened while parsing the config of ", NodeSet);
    }
    return currentConfig;
};
DDCatPluginContainer.prototype.generateAttrNode = function (currentNode) {
    const cacheThis = this;
    console.log(currentNode);
    let attributeSet;
    if (currentNode) {
        attributeSet = {};
        Array.from($(currentNode).xpath("@*")).forEach(function (x) {
            try {
                attributeSet[x.nodeName] = $(x).val();
            } catch (e) {
                console.log(e);
            }
            console.log(attributeSet);
        });
    }
    this.supportParseOptions.forEach(function (parserName) {
        if (attributeSet[parserName]) {
            attributeSet[parserName] = cacheThis.setParseMethod(parserName, attributeSet[parserName]);
        }
    });
    return attributeSet;
};
DDCatPluginContainer.prototype.buildChildrenConfig = function (currentNode) {
    const cacheThis = this;
    const subConfigs = [];
    let childrenElements = Array.from($(currentNode).xpath("child::*"));
    console.log(childrenElements);
    if (childrenElements && Array.isArray(childrenElements) && childrenElements.length > 0) {
        childrenElements.forEach(function (e) {
            let subConfig = cacheThis.generateAttrNode(e);
            if (subConfig) {
                subConfigs.push(subConfig);
            }
        });
        console.log("children elements were ", subConfigs);
    }
    return subConfigs;
};

export default DDCatPluginContainer;
