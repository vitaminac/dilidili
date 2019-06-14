// import { store } from "../../store";
import listPlugins from "../../actions/allPlugin";
const callingHistory = [];
const globalContext = this;

export function trace() {
    return (func) => {
        return typeof func === "function" ? function () {
            const callRecord = {function: func, arguments: arguments, result: null, error: null, timeStart: new Date().toLocaleString(), timeEnd: null};
            console.log("trace: calling ", callRecord.function, " at ", callRecord.timeStart, "with ", callRecord.arguments);
            try {
                callRecord.result = func.apply(this, arguments);
                callRecord.timeEnd = new Date().toLocaleString();
                console.log(callRecord.function, " called result was ", callRecord.result);
            } catch (e) {
                callRecord.error = e;
                console.log(func, arguments, e);
                throw e;
            } finally {
                trace.history.push(callRecord);
            }
            return callRecord.result;
        } : null;
    };
}
// static value
trace.history = [];
/* **************************************************************************************** */
function copyToContext(exportApi, context) {
    try {
        for (let publicApi in exportApi) {
            if (exportApi.hasOwnProperty(publicApi)) {
                context[publicApi] = exportApi[publicApi];
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function addRequire(src) {
    let imported = document.createElement("script");
    imported.src = src;
    document.head.appendChild(imported);
}

export function getPageText() {
    let html;
    try {
        JSON.parse(document.body.firstElementChild.innerHTML);
        console.log("document is considered as json type");
        html = document.body.firstElementChild.innerHTML;
    } catch (e) {
        html = document.documentElement.outerHTML;
    }
    return html;
}

export function getCurrentUrl() {
    return window.location.toString();
}

export function getPageCookieReference() {
    return document.cookie;
}

export function saveToLocal(objectKey, objectValue) {
    store.dispatch(listPlugins(objectValue));
}

function loadFromLocal(objectKey) {
    return JSON.parse(localStorage.getItem(objectKey));
}

const fetch = trace()(function fetch() {
    const deferred = Q.defer();
    window.fetch(...Array.from(arguments)).then(function (response) {
        response.text().then(function (text) {
            // do something with the text response
            response.Body = text;
            deferred.resolve(response);
        }, function (reason) {
            console.log(arguments);
            deferred.reject(reason);
        });
    }, function (reason) {
        console.log(arguments);
        deferred.reject(reason);
    });
    return deferred.promise;
});

export function concatNarrays() {
    const arr = Array.from(arguments);
    return arr.reduce(function (prev, next) {
        if (Array.isArray(next)) {
            return prev.concat(next);
        } else {
            prev.push(next);
            return prev;
        }
    });
}
