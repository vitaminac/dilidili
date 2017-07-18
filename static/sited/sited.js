webpackJsonp([2], {

    /***/ "./src/actions/index.js": /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony default export */
        __webpack_exports__["a"] = ({
            changeSource: "changeSource",
            changeScrollDirection: "changeScrollDirection",
            listPlugins: "listPlugins"
        });

        /***/
    }),

    /***/ "./src/index.js": /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {value: true});
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__renderApp__ = __webpack_require__("./src/renderApp.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_blueimp_md5__ = __webpack_require__("./node_modules/blueimp-md5/js/md5.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_blueimp_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_blueimp_md5__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__utils_b64__ = __webpack_require__("./src/utils/b64.js");


        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).ready(function () {
            if (__WEBPACK_IMPORTED_MODULE_2_blueimp_md5___default()(eval(Object(__WEBPACK_IMPORTED_MODULE_3__utils_b64__["a" /* b64DecodeUnicode */])("d2luZG93LmxvY2F0aW9uLmhvc3RuYW1l"))) === "f528764d624db129b32c21fbca0cb8d6") {
                const $div = __WEBPACK_IMPORTED_MODULE_1_jquery___default()("<div>", {id: "sited"});
                $div.prependTo(__WEBPACK_IMPORTED_MODULE_1_jquery___default()("body"));
                Object(__WEBPACK_IMPORTED_MODULE_0__renderApp__["a" /* default */])($div[0]);
                $div.replaceWith(function () {
                    return $div.children();
                });
            }
        });

        /***/
    }),

    /***/ "./src/renderApp.js": /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {value: true});

// CONCATENATED MODULE: ./src/transformer/encodeBookUrl.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__utils_b64__ = __webpack_require__("./src/utils/b64.js");


        function encodeBookUrl(books$) {
            return books$.distinct(book => book.url).map(book => {
                book.url = Object(__WEBPACK_IMPORTED_MODULE_0__utils_b64__["b" /* b64EncodeUnicode */])(book.url) + "/";
                return book;
            });
        }

// CONCATENATED MODULE: ./src/services/ddcatPluginLoader/ddcatContainer.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__pluginContainer__ = __webpack_require__("./src/services/ddcatPluginLoader/pluginContainer.js");


        let DDCatContainer = class DDCatContainer {
            constructor(prevPlugins = []) {
                this.installNewPlugin = plugin => {
                    const ddcatContainer = new __WEBPACK_IMPORTED_MODULE_1__pluginContainer__["a" /* default */](plugin);
                    this.plugins[ddcatContainer.title] = ddcatContainer;
                };

                this.restorePlugins(prevPlugins);
                this.plugins = {};
            }

            restorePlugins(prevPlugins) {
                if (Array.isArray(prevPlugins)) {
                    prevPlugins.forEach(plugin => {
                        this.installNewPlugin(plugin);
                    });
                }
            }

            *[Symbol.iterator]() {
                for (let [key, value] of Object.entries(this.plugins)) {
                    yield value; // single plugin
                }
            }

            getData(pluginName, nodeName, key) {
                // this.plugins["動漫狂"].getnode("hots");
                return __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].create(function (observer) {
                    __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].from(json).subscribe(x => {
                        observer.next(x);
                    });
                });
            }
        };

// CONCATENATED MODULE: ./src/services/ddcatPluginLoader/index.js


        const prevPlugins = []; // inject here from redux store

        const ddcatContainer = new DDCatContainer(prevPlugins);

        /* harmony default export */
        var ddcatPluginLoader_defaultExport = (ddcatContainer);
// CONCATENATED MODULE: ./src/actions/createSource.js


        function createSource(node) {
            return encodeBookUrl(ddcatPluginLoader_defaultExport.getData(node));
        }

// CONCATENATED MODULE: ./src/reducer/ddcat/getBookList.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__actions_index__ = __webpack_require__("./src/actions/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_immutable__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_immutable__);


        const initialState = __WEBPACK_IMPORTED_MODULE_2_immutable__["Map"]({"home": createSource("home")});

        function getBookList(state = initialState, action) {
            switch (action.type) {
                case __WEBPACK_IMPORTED_MODULE_0__actions_index__["a" /* default */].changeSource:
                    return state.set(action.observable, action.source);
                default:
                    return state;
            }
        }

// CONCATENATED MODULE: ./src/reducer/ddcat/availablePlugin.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__("./src/actions/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);


        const availablePlugin_initialState = __WEBPACK_IMPORTED_MODULE_1_immutable___default.a.Map({});

        function availablePlugin(state = availablePlugin_initialState, action) {
            switch (action.type) {
                case __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* default */].listPlugins:
                    return state.set(__WEBPACK_IMPORTED_MODULE_0__actions__["a" /* default */].listPlugins, action.payload);
                default:
                    return state;
            }
        }

// CONCATENATED MODULE: ./src/reducer/ddcat/index.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("./node_modules/redux/es/index.js");


        /* harmony default export */
        var ddcat_defaultExport = (Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
            Booklist: getBookList,
            pluginList: availablePlugin
        }));
// CONCATENATED MODULE: ./src/actions/immutableProps.js
        const ScrollDirection = "ScrollDirection";

// CONCATENATED MODULE: ./src/reducer/ui/index.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__("./src/actions/index.js");


        const ui_initialState = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Map({[ScrollDirection]: "up"});

        function scroll(state = ui_initialState, action) {
            switch (action.type) {
                case __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* default */].changeScrollDirection:
                    return state.set(ScrollDirection, action.payload);
                default:
                    return state;
            }
        }

// CONCATENATED MODULE: ./src/reducer/index.js


        /* harmony default export */
        var reducer_defaultExport = ({
            ddcat: ddcat_defaultExport,
            ui: scroll
        });
// CONCATENATED MODULE: ./src/store.js
        /* harmony import */
        var store___WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("./node_modules/redux/es/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_history__ = __webpack_require__("./node_modules/history/es/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__("./node_modules/react-router-redux/es/index.js");
        var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } }
                }
                return target;
            };


        // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
        const store_history = Object(__WEBPACK_IMPORTED_MODULE_1_history__["createBrowserHistory"])();

// Build the middleware for intercepting and dispatching navigation actions
        const middleware = Object(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerMiddleware"])(store_history);

        const composeEnhancers = typeof window === "object" && "development" === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : store___WEBPACK_IMPORTED_MODULE_0_redux__["compose"];

        const enhancer = composeEnhancers(Object(store___WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(middleware)
// other store enhancers if any
        );

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
        const store = Object(store___WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(Object(store___WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(_extends({}, reducer_defaultExport, {
            router: __WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerReducer"]
        })), {}, enhancer);


// CONCATENATED MODULE: ./src/abstracts/consts.js
        const consts = {
            defaultClassName: "default"
        };

        /* harmony default export */
        var consts_defaultExport = (consts);
// CONCATENATED MODULE: ./src/layout/container/body.jsx
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


        let Body = class Body extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
            render() {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    {className: this.props.className},
                    this.props.children
                );
            }
        };

        Body.defaultProps = {
            className: consts_defaultExport.defaultClassName
        };

        /* harmony default export */
        var body_defaultExport = (Body);
// CONCATENATED MODULE: ./src/layout/header/nav.jsx
        /* harmony import */
        var nav___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var nav___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(nav___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("./node_modules/react-router-dom/es/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_StyleSheets_layout_header_navigator__ = __webpack_require__("./src/styles/layout/header/_navigator.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_StyleSheets_layout_header_navigator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_StyleSheets_layout_header_navigator__);


        let Navigator = class Navigator extends nav___WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
            render() {
                const obj = this.props.nav;
                return React.createElement(
                    "div",
                    {className: __WEBPACK_IMPORTED_MODULE_2_StyleSheets_layout_header_navigator___default.a.navigator},
                    Object.keys(obj).map(key => React.createElement(
                        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
                        {key: key, className: __WEBPACK_IMPORTED_MODULE_2_StyleSheets_layout_header_navigator___default.a.link, to: obj[key].link},
                        obj[key].name
                    ))
                );
            }
        };

// CONCATENATED MODULE: ./src/layout/header/searchBar.jsx
        /* harmony import */
        var searchBar___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var searchBar___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(searchBar___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_header_searchbar__ = __webpack_require__("./src/styles/layout/header/_searchbar.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_header_searchbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_header_searchbar__);


        let SearchBar = class SearchBar extends searchBar___WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
            render() {
                return React.createElement(
                    "div",
                    {className: __WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_header_searchbar___default.a.searchbar},
                    React.createElement(
                        "span",
                        null,
                        React.createElement("img", {src: "./image/search.png"}),
                        React.createElement("span", {className: "search-input-edge"}),
                        React.createElement("input", {className: "search-input"}),
                        React.createElement("span", {className: "search-input-edge"})
                    ),
                    React.createElement("ul", {className: "search-result", style: {display: "none"}})
                );
            }
        };

// CONCATENATED MODULE: ./src/layout/header/index.jsx
        /* harmony import */
        var header___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var header___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(header___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_header_header__ = __webpack_require__("./src/styles/layout/header/_header.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_header_header___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_header_header__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("./node_modules/classnames/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_react_redux__ = __webpack_require__("./node_modules/react-redux/es/index.js");
        var _dec, _class;


        let header_Header = (_dec = Object(__WEBPACK_IMPORTED_MODULE_5_react_redux__["connect"])(state => {
            return {ScrollDirection: state.ui.get(ScrollDirection)};
        }), _dec(_class = class Header extends header___WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
            render() {
                const classes = __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_header_header___default.a.header, {[__WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_header_header___default.a.ishidden]: this.props.ScrollDirection !== "up"});
                return React.createElement(
                    "header",
                    {className: classes},
                    React.createElement(Navigator, {nav: this.props.nav}),
                    React.createElement(SearchBar, null)
                );
            }
        }) || _class);

// CONCATENATED MODULE: ./src/layout/footer/index.jsx
        /* harmony import */
        var footer___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var footer___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(footer___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_footer__ = __webpack_require__("./src/styles/layout/_footer.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_footer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_footer__);


        let Footer = class Footer extends footer___WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
            render() {
                const obj = this.props.nav;
                return React.createElement(
                    "footer",
                    {className: __WEBPACK_IMPORTED_MODULE_1_StyleSheets_layout_footer___default.a.footer},
                    React.createElement(
                        "ul",
                        null,
                        Object.keys(obj).map(key => React.createElement(
                            "li",
                            {key: key},
                            React.createElement(
                                "a",
                                {href: obj[key].link},
                                React.createElement(
                                    "span",
                                    {className: "icon"},
                                    React.createElement(
                                        "svg",
                                        {xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: obj[key].viewBox},
                                        React.createElement("path", {d: obj[key].path})
                                    )
                                )
                            )
                        ))
                    )
                );
            }
        };

// CONCATENATED MODULE: ./src/components/book/IframeBook.jsx
        /* harmony import */
        var IframeBook___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var IframeBook___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(IframeBook___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_iframebook__ = __webpack_require__("./src/styles/components/_iframebook.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_iframebook___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_iframebook__);


        let IframeBook = class IframeBook extends IframeBook___WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
            constructor(props) {
                super(props);

                this.toggleShow = () => {
                    this.setState(function (prevState, props) {
                        const style = Object.assign({}, prevState.style, {display: "block"});
                        return {
                            style: style
                        };
                    });
                    this.props.callback();
                };

                this.state = {
                    style: {}
                };
            }

            render() {
                return React.createElement("iframe", {
                    className: __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_iframebook___default.a.iframebook,
                    src: this.props.src,
                    style: this.state.style,
                    onLoad: this.toggleShow,
                    sandbox: true
                });
            }
        };

// CONCATENATED MODULE: ./src/components/book/BookContainer.jsx
        /* harmony import */
        var BookContainer___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var BookContainer___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(BookContainer___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_StyleSheets_components_book__ = __webpack_require__("./src/styles/components/_book.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_StyleSheets_components_book___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_StyleSheets_components_book__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_utils_b64__ = __webpack_require__("./src/utils/b64.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("./node_modules/classnames/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);


        let BookContainer_BookContainer = class BookContainer extends BookContainer___WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
            constructor(props) {
                super(props);

                this.show = () => {
                    this.setState(function (prevState, props) {
                        prevState.classes[__WEBPACK_IMPORTED_MODULE_2_StyleSheets_components_book___default.a.show] = true;
                        prevState.classes[__WEBPACK_IMPORTED_MODULE_2_StyleSheets_components_book___default.a.hide] = false;
                        return {
                            style: prevState.classes
                        };
                    });
                };

                this.state = {
                    classes: {
                        [__WEBPACK_IMPORTED_MODULE_2_StyleSheets_components_book___default.a.book]: true,
                        [__WEBPACK_IMPORTED_MODULE_2_StyleSheets_components_book___default.a.hide]: true
                    }
                };
            }

            render() {
                const classes = __WEBPACK_IMPORTED_MODULE_4_classnames___default()(this.state.classes);
                return React.createElement(
                    "div",
                    {id: "test", className: classes, style: this.state.style, onClick: this.props.hide.bind(this, this.props.match.url)},
                    React.createElement(IframeBook, {
                        src: Object(__WEBPACK_IMPORTED_MODULE_3_utils_b64__["a" /* b64DecodeUnicode */])(this.props.match.params.bookSrc),
                        callback: this.show
                    })
                );
            }
        };


        /* harmony default export */
        var BookContainer_defaultExport = (BookContainer_BookContainer);
// CONCATENATED MODULE: ./src/components/book/index.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__("./node_modules/react-router-redux/es/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__("./node_modules/react-redux/es/index.js");


        function mapDispatchToProps(dispatch) {
            return {
                hide: function goParent(path) {
                    dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__["goBack"])(path));
                }
            };
        }

        /* harmony default export */
        var book_defaultExport = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(undefined, mapDispatchToProps)(BookContainer_defaultExport));
// CONCATENATED MODULE: ./src/abstracts/info/footer.js
        const footerLink = {
            email: {
                link: "mailto:supermanenchina@gmail.com",
                path: "M12 12.713L.015 3h23.97L12 12.713zM6.575 10.89L0 5.563v12.5l6.575-7.17zm10.85 0L24 18.064v-12.5l-6.575 5.328zm-1.557 1.262L12 15.287l-3.868-3.135L.022 21h23.956l-8.11-8.848z",
                viewBox: "0 0 24 24"
            },
            github: {
                link: "https://github.com/vitaminac",
                path: "M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z",
                viewBox: "0 0 16 16"

            },
            twitter: {
                link: "www.twitter.com",
                path: "M15.969,3.058c-0.586,0.26-1.217,0.436-1.878,0.515c0.675-0.405,1.194-1.045,1.438-1.809c-0.632,0.375-1.332,0.647-2.076,0.793c-0.596-0.636-1.446-1.033-2.387-1.033c-1.806,0-3.27,1.464-3.27,3.27 c0,0.256,0.029,0.506,0.085,0.745C5.163,5.404,2.753,4.102,1.14,2.124C0.859,2.607,0.698,3.168,0.698,3.767 c0,1.134,0.577,2.135,1.455,2.722C1.616,6.472,1.112,6.325,0.671,6.08c0,0.014,0,0.027,0,0.041c0,1.584,1.127,2.906,2.623,3.206 C3.02,9.402,2.731,9.442,2.433,9.442c-0.211,0-0.416-0.021-0.615-0.059c0.416,1.299,1.624,2.245,3.055,2.271 c-1.119,0.877-2.529,1.4-4.061,1.4c-0.264,0-0.524-0.015-0.78-0.046c1.447,0.928,3.166,1.469,5.013,1.469 c6.015,0,9.304-4.983,9.304-9.304c0-0.142-0.003-0.283-0.009-0.423C14.976,4.29,15.531,3.714,15.969,3.058z",
                viewBox: "0 0 16 16"
            },
            linkin: {
                link: "www.linkin.com",
                path: "M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z",
                viewBox: "0 0 24 24"
            },
            instagram: {
                link: "www.instangram",
                path: "M21.23 0H2.77A2.77 2.77 0 0 0 0 2.77v18.46A2.77 2.77 0 0 0 2.77 24H21.23A2.77 2.77 0 0 0 24 21.23V2.77A2.77 2.77 0 0 0 21.23 0zM12 7.385a4.615 4.615 0 1 1 .002 9.23A4.615 4.615 0 0 1 12 7.385zm9 12.693c0 .51-.413.922-.924.922H3.924A.923.923 0 0 1 3 20.078V10h1.897a7.56 7.56 0 0 0-.2.97c-.05.338-.08.68-.08 1.03a7.384 7.384 0 0 0 14.767 0c0-.35-.03-.692-.08-1.028a7.56 7.56 0 0 0-.2-.97H21v10.076zm0-13.98c0 .51-.413.923-.924.923h-2.174a.923.923 0 0 1-.923-.922V3.923c0-.51.41-.923.922-.923h2.174c.51 0 .924.413.924.923v2.175z",
                viewBox: "0 0 24 24"
            },
            RSS: {
                link: "not rss",
                path: "M6.503 20.752A3.25 3.25 0 0 1 3.253 24 3.25 3.25 0 0 1 0 20.752a3.25 3.25 0 0 1 3.252-3.248 3.25 3.25 0 0 1 3.25 3.248zM0 8.18v4.81c6.05.063 10.96 4.967 11.022 11.01h4.817C15.776 15.29 8.72 8.242 0 8.18zm0-3.368C10.58 4.858 19.152 13.406 19.183 24H24C23.97 10.77 13.245.046 0 0v4.812z",
                viewBox: "0 0 24 24"
            }
        };
        /* harmony default export */
        var footer_defaultExport = (footerLink);
// CONCATENATED MODULE: ./src/abstracts/info/header.js
        /* harmony default export */
        var header_defaultExport = ({
            home: {link: "/sited/home", name: "Home"}
        });
// CONCATENATED MODULE: ./src/hoc/subscribe.js
        /* harmony import */
        var subscribe___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var subscribe___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(subscribe___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_hoist_non_react_statics__ = __webpack_require__("./node_modules/hoist-non-react-statics/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hoist_non_react_statics__);
        /* harmony import */
        var subscribe___WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__("./node_modules/react-redux/es/index.js");

        function _objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) {
                if (keys.indexOf(i) >= 0) continue;
                if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                target[i] = obj[i];
            }
            return target;
        }


        function getDisplayName(WrappedComponent) {
            return WrappedComponent.displayName || WrappedComponent.name || "Component";
        }

// This function takes a component...
        function subscribe(selector = state => state, transform = source => source, whenDataChange, whenSourceChange, setStateCallback, propertyNmae = "data", mapDispatchToProps) {
            return WrappedComponent => {
                const mapStateToProps = state => {
                    return {
                        observable: selector(state)
                    };
                };
                // ...and returns another component...
                let WithSubscription = class WithSubscription extends subscribe___WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
                    constructor(props) {
                        super(props);

                        this.subscribe = observable => {
                            // "observable" is some rx observable
                            this.source = transform(observable);
                            // ... that takes care of the subscription...
                            // Subscribe to changes
                            this.subscription = this.source.subscribe(this.changeData);
                        };

                        this.unsubscribe = () => {
                            this.subscription.unsubscribe();
                        };

                        this.changeData = data => {
                            // Update component state whenever the data source changes
                            this.setState((prevState, props) => {
                                return {data: whenDataChange(prevState.data, data)};
                            }, setStateCallback);
                        };

                        this.state = {
                            data: []
                        };
                    }

                    componentWillReceiveProps(nextProps) {
                        if (nextProps.observable !== this.props.observable) {
                            if (whenSourceChange) {
                                this.setState((prevState, props) => {
                                    return {data: whenSourceChange(prevState.data, nextProps.observable)};
                                }, setStateCallback);
                            }
                            this.unsubscribe();
                            // Update component state whenever the data source changes
                            this.subscribe(nextProps.observable);
                        }
                    }

                    componentDidMount() {
                        this.subscribe(this.props.observable);
                    }

                    componentWillUnmount() {
                        // Clean up listener
                        this.unsubscribe();
                    }

                    render() {
                        // Filter out extra props that are specific to this HOC and shouldn't be passed through
                        const _props           = this.props,
                              {observable}     = _props,
                              passThroughProps = _objectWithoutProperties(_props, ["observable"]);
                        const {data} = this.state;
                        // Inject props into the wrapped component. These are usually state values or instance methods.
                        passThroughProps[propertyNmae] = data;
                        passThroughProps.setState = this.setState.bind(this);
                        // ... and renders the wrapped component with the fresh data!
                        // Notice that we pass through any additional props
                        return subscribe___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, passThroughProps);
                    }
                };

                WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
                __WEBPACK_IMPORTED_MODULE_1_hoist_non_react_statics___default()(WithSubscription, WrappedComponent);
                return Object(subscribe___WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(WithSubscription);
            };
        }

        /* harmony default export */
        var subscribe_defaultExport = (subscribe);
// CONCATENATED MODULE: ./src/components/cardList/cardShow/image.jsx
        /* harmony import */
        var image___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var image___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(image___WEBPACK_IMPORTED_MODULE_0_react__);


        let Image = class Image extends image___WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {
            constructor(...args) {
                var _temp;

                return _temp = super(...args), this.changeParentWidth = width => {
                    this.props.callback(this.img.naturalWidth);
                }, _temp;
            }

            render() {
                return image___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
                    onLoad: this.changeParentWidth, ref: img => {
                        this.img = img;
                    }, src: this.props.src, alt: "loading"
                });
            }
        };


        /* harmony default export */
        var image_defaultExport = (Image);
// CONCATENATED MODULE: ./src/components/cardList/cardShow/card.jsx
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_react_router_dom__ = __webpack_require__("./node_modules/react-router-dom/es/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_card__ = __webpack_require__("./src/styles/components/_card.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_card__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);


        let card_Card = class Card extends __WEBPACK_IMPORTED_MODULE_2_react___default.a.Component {
            constructor(props) {
                super(props);

                this.changeWidth = imageWidth => {
                    this.setState({style: {display: "block", width: imageWidth}});
                };

                this.state = {isToggleOn: true, style: {display: "none"}};
            }

            // This syntax ensures `this` is bound within handleClick.
            // Warning: this is *experimental* syntax.


            render() {
                return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                    "div",
                    {className: __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_card___default.a.card, style: this.state.style},
                    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_0_react_router_dom__["Link"],
                        {to: this.props.card.url},
                        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(image_defaultExport, {src: this.props.card.logo, callback: this.changeWidth}),
                        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                            "div",
                            {className: __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_card___default.a.descriptioncontainer},
                            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                                "h4",
                                null,
                                this.props.card.name
                            ),
                            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                                "p",
                                null,
                                this.props.card.description
                            )
                        )
                    )
                );
            }
        };


        /* harmony default export */
        var card_defaultExport = (card_Card);
// CONCATENATED MODULE: ./src/components/cardList/cardShow/draggableCard.jsx
        /* harmony import */
        var draggableCard___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var draggableCard___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(draggableCard___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("./node_modules/prop-types/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__("./node_modules/react-dnd/lib/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_StyleSheets_components_card__ = __webpack_require__("./src/styles/components/_card.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_StyleSheets_components_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_StyleSheets_components_card__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_classnames__ = __webpack_require__("./node_modules/classnames/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_classnames__);
        var draggableCard__dec, _dec2, draggableCard__class, _class2, _temp;

        function draggableCard__objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) {
                if (keys.indexOf(i) >= 0) continue;
                if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                target[i] = obj[i];
            }
            return target;
        }


// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
        const Types = {
            CARD: "card"
        };

        /**
         * Specifies the drag source contract.
         * Only `beginDrag` function is required.
         */
        const cardSource = {
            beginDrag(props, monitor, component) {
                // Return the data describing the dragged item
                return {
                    sandboxID: props.sandboxID
                };
            },
            endDrag(props, monitor, component) {
                // fix bug when dropped in not dropable context
                if (!monitor.didDrop()) {
                    return;
                }
                const target = monitor.getDropResult();
                props.callback(target.sandboxID, props.sandboxID);
            }
        };

        const cardTarget = {
            drop(props, monitor, component) {
                // Return the data describing the dragged item
                return {
                    sandboxID: props.sandboxID
                };
            }
        };

        function collect(connect, monitor) {
            return {
                // Call this function inside render()
                // to let React DnD handle the drag events:
                connectDragSource: connect.dragSource(),
                // You can ask the monitor about the current drag state:
                isDragging: monitor.isDragging()
            };
        }

        function collectTarget(connect, monitor) {
            return {
                // Call this function inside render()
                // to let React DnD handle the drag events:
                connectDropTarget: connect.dropTarget(),
                // You can ask the monitor about the current drag state:
                isOver: monitor.isOver()
            };
        }

// Use the decorator syntax
        let draggableCard_DraggableCard = (draggableCard__dec = Object(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DragSource"])(Types.CARD, cardSource, collect), _dec2 = Object(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DropTarget"])(Types.CARD, cardTarget, collectTarget), draggableCard__dec(draggableCard__class = _dec2(draggableCard__class = (_temp = _class2 = class DraggableCard extends draggableCard___WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

                componentWillReceiveProps(nextProps) {
                    if (JSON.stringify(this.props.card) !== JSON.stringify(nextProps.card)) {
                        console.log(this.props, nextProps);
                    }
                }

                render() {
                    const _props                                                     = this.props,
                          {isDragging, connectDragSource, connectDropTarget, isOver} = _props,
                          passThrough                                                = draggableCard__objectWithoutProperties(_props, ["isDragging", "connectDragSource", "connectDropTarget", "isOver"]);
                    // Your component receives its own props as usual
                    // These two props are injected by React DnD,
                    // as defined by your `collect` function above:
                    const classes = __WEBPACK_IMPORTED_MODULE_5_classnames___default()(__WEBPACK_IMPORTED_MODULE_4_StyleSheets_components_card___default.a.cardcontainer, {[__WEBPACK_IMPORTED_MODULE_4_StyleSheets_components_card___default.a.isdragging]: isDragging || isOver});
                    return connectDropTarget(connectDragSource(draggableCard___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        {className: classes},
                        draggableCard___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(card_defaultExport, passThrough)
                    )));
                }
            }, _class2.propTypes = {
                connectDragSource: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
                connectDropTarget: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
                isDragging: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
            }, _temp)) || draggableCard__class) || draggableCard__class);

// CONCATENATED MODULE: ./src/components/cardList/cardShow/card-show.jsx
        /* harmony import */
        var card_show___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var card_show___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(card_show___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__("./node_modules/prop-types/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);


        let card_show_CardShow = class CardShow extends card_show___WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
            constructor(...args) {
                var _temp;

                return _temp = super(...args), this.exchange = (id1, id2) => {
                    this.props.setState(prevState => {
                        [prevState.data[id1], prevState.data[id2]] = [prevState.data[id2], prevState.data[id1]];
                        return {data: prevState.data};
                    });
                }, _temp;
            }

            render() {
                const cacheThis = this;
                return card_show___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    {className: this.props.className},
                    this.props.list && Array.isArray(this.props.list) && this.props.list.map(function (card, index) {
                        return card_show___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(draggableCard_DraggableCard, {
                            key: card.url, id: index, callback: cacheThis.exchange, card: card,
                            openTarget: cacheThis.props.openTarget
                        });
                    })
                );
            }
        };


        card_show_CardShow.propTypes = {
            className: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string.isRequired
        };

        card_show_CardShow.defaultProps = {
            className: consts_defaultExport.defaultClassName
        };

        /* harmony default export */
        var card_show_defaultExport = (card_show_CardShow);
// CONCATENATED MODULE: ./src/selectors/selectBookList.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__("./node_modules/reselect/lib/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);


        const ddcatPluginSelector = state => state.ddcat;

        const bookListSelector = Object(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(ddcatPluginSelector, ddcat => ddcat.Booklist.get("home"));

        /* harmony default export */
        var selectBookList_defaultExport = (bookListSelector);
// CONCATENATED MODULE: ./src/components/cardList/index.js
        /* harmony import */
        var cardList___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var cardList___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(cardList___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var cardList___WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("./node_modules/classnames/index.js");
        /* harmony import */
        var cardList___WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(cardList___WEBPACK_IMPORTED_MODULE_3_classnames__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_StyleSheets_components_home__ = __webpack_require__("./src/styles/components/_home.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_StyleSheets_components_home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_StyleSheets_components_home__);

        function cardList__objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) {
                if (keys.indexOf(i) >= 0) continue;
                if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                target[i] = obj[i];
            }
            return target;
        }


// A simple component that shows the pathname of the current location
        let cardList_Home = class Home extends cardList___WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
            constructor(props) {
                super(props);
                this.observableName = props.match.params.path;
                this.WithSubscribed = subscribe_defaultExport(selectBookList_defaultExport, observable => observable.map(x => [x]), (prevdata, data) => {
                    return prevdata.concat(data);
                }, () => [], undefined, "list")(card_show_defaultExport);
            }

            componentWillReceiveProps(nextProps) {
                if (nextProps.match.params.path !== this.observableName) {
                    this.WithSubscribed = subscribe_defaultExport("ddcat", nextProps.match.params.path, observable => observable.map(x => [x]), (prevdata, data) => {
                        return prevdata.concat(data);
                    }, () => [], undefined, "list")(card_show_defaultExport);
                }
            }

            render() {
                const WithSubscribed = this.WithSubscribed;
                const _props                           = this.props,
                      {history, location, match, path} = _props,
                      passThrough                      = cardList__objectWithoutProperties(_props, ["history", "location", "match", "path"]);
                console.log(this.props.location.pathname.replace(this.props.match.url, "").replace(/\//g, ""), this.props);
                passThrough["className"] = cardList___WEBPACK_IMPORTED_MODULE_3_classnames___default()({
                        [__WEBPACK_IMPORTED_MODULE_4_StyleSheets_components_home___default.a.ishidden]: this.props.location.pathname.replace(this.props.match.url, "").replace(/\/g/, "").length
                    }) || consts_defaultExport.defaultClassName;
                return cardList___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WithSubscribed, passThrough);
            }
        };


        /* harmony default export */
        var cardList_defaultExport = (cardList_Home);
// CONCATENATED MODULE: ./src/actions/changeScrollDirection.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__("./src/actions/index.js");


        function updateScrollDirection(direction) {
            return {
                type: __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].changeScrollDirection,
                payload: direction
            };
        }

// CONCATENATED MODULE: ./src/transformer/scrollBar.js
        /* harmony import */
        var scrollBar___WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__(2);
        /* harmony import */
        var scrollBar___WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(scrollBar___WEBPACK_IMPORTED_MODULE_0_rxjs__);


        function scrollUpDown(input) {
            let lastScrollTop = 0;
            let currentScrollTop = 0;
            return scrollBar___WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].create(function subscribe(observer) {
                observer.next("up");
                input.subscribe(function (event) {
                    currentScrollTop = event.target.scrollTop;
                    observer.next(currentScrollTop < lastScrollTop ? "up" : "down");
                    lastScrollTop = currentScrollTop;
                });
            }).distinctUntilChanged();
        }

        /* harmony default export */
        var scrollBar_defaultExport = (scrollUpDown);
// CONCATENATED MODULE: ./src/epics/index.js
        /* harmony import */
        var epics___WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__(2);
        /* harmony import */
        var epics___WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(epics___WEBPACK_IMPORTED_MODULE_0_rxjs__);


        function wrapperDispatch(dispatch, transforms) {
            const subject = new epics___WEBPACK_IMPORTED_MODULE_0_rxjs__["Subject"]();
            const subscription = transforms(subject).subscribe(action => {
                dispatch(action);
            });
            return action => {
                subject.next(action);
            };
        }

// CONCATENATED MODULE: ./src/epics/monitorScrollDirection.js


        function monitorScrollDirection_updateScrollDirection(dispatch) {
            return wrapperDispatch(dispatch, function (action$) {
                return scrollBar_defaultExport(action$).map(direction => updateScrollDirection(direction));
            });
        }

// CONCATENATED MODULE: ./src/hoc/wrapper.js
        function wrap(wrapper) {
            return WrappedComponent => {
                return wrapper(WrappedComponent);
            };
        }

// CONCATENATED MODULE: ./src/layout/article/index.jsx
        /* harmony import */
        var article___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var article___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(article___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__("./node_modules/react-router/es/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__("./node_modules/react-redux/es/index.js");
        var article__dec, article__dec2, article__class;


        let article_Article = (article__dec = wrap(__WEBPACK_IMPORTED_MODULE_2_react_router__["withRouter"]), article__dec2 = Object(__WEBPACK_IMPORTED_MODULE_3_react_redux__["connect"])(undefined, dispatch => ({
            updateScrollDirection: monitorScrollDirection_updateScrollDirection(dispatch)
        })), article__dec(article__class = article__dec2(article__class = class Article extends article___WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
                render() {
                    const url = this.props.match.url;
                    return React.createElement(
                        "article",
                        {onScroll: this.props.updateScrollDirection},
                        React.createElement(
                            __WEBPACK_IMPORTED_MODULE_2_react_router__["Switch"],
                            null,
                            React.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Route"], {
                                exact: true,
                                strict: true,
                                path: `${url}/:id`,
                                render: props => React.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Redirect"], {to: `${props.match.params.sandboxID}/`})
                            }),
                            React.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Route"], {
                                exact: true,
                                path: `${url}`,
                                render: () => React.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Redirect"], {to: `${url}home/`})
                            }),
                            React.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Route"], {strict: true, path: `${url}/:path/`, component: cardList_defaultExport})
                        )
                    );
                }
            }) || article__class) || article__class);

// CONCATENATED MODULE: ./src/components/button/FileImageInputButton/FileInput.jsx
        /* harmony import */
        var FileInput___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var FileInput___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(FileInput___WEBPACK_IMPORTED_MODULE_0_react__);


        let FileInput = class FileInput extends FileInput___WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
            constructor(props) {
                super(props);

                this.readText = e => {
                    if (e.target.value) {
                        const cacheThis = this;
                        const fileName = e.target.value;
                        const file = e.target.files[0];
                        const fr = new FileReader();
                        fr.onload = function () {
                            cacheThis.props.callback(fr.result);
                        };
                        fr.readAsText(file);
                        console.log("reading from ", fileName);
                        this.setState({
                            value: ""
                        });
                    }
                };

                this.style = Object.assign({}, this.props.style, {
                    "opacity": "0",
                    "zIndex": "2"
                });
                this.state = {
                    value: ""
                };
            }

            render() {
                return React.createElement(
                    "input",
                    {value: this.state.value, style: this.style, type: "file", accept: ".xml,.sited", onChange: this.readText},
                    this.props.children
                );
            }
        };

// CONCATENATED MODULE: ./src/components/button/FileImageInputButton/ImageInput.jsx
        /* harmony import */
        var ImageInput___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var ImageInput___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(ImageInput___WEBPACK_IMPORTED_MODULE_0_react__);


        let ImageInput = class ImageInput extends ImageInput___WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
            render() {
                return React.createElement(
                    "input",
                    {style: this.props.style, type: "image", src: this.props.src, name: "load"},
                    this.props.children
                );
            }
        };

// CONCATENATED MODULE: ./src/components/button/FileImageInputButton/FileImageInputButton.jsx
        /* harmony import */
        var FileImageInputButton___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var FileImageInputButton___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(FileImageInputButton___WEBPACK_IMPORTED_MODULE_0_react__);


        let FileImageInputButton_FileImageInputButton = class FileImageInputButton extends FileImageInputButton___WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {
            constructor(props) {
                super(props);
                this.style = {
                    "width": "50px",
                    "height": "50px",
                    "position": "fixed",
                    "top": "0",
                    "right": "0",
                    "zIndex": 999
                };
                this.childStyle = {
                    "position": "absolute",
                    "top": "0",
                    "right": "0",
                    "width": "100%",
                    "height": "100%",
                    "display": "block"
                };
            }

            render() {
                return FileImageInputButton___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    {style: this.style},
                    FileImageInputButton___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(FileInput, {callback: this.props.callback, style: this.childStyle}),
                    FileImageInputButton___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ImageInput, {style: this.childStyle, src: this.props.src})
                );
            }
        };


        /* harmony default export */
        var FileImageInputButton_defaultExport = (FileImageInputButton_FileImageInputButton);
// CONCATENATED MODULE: ./src/components/processBar/processBar.jsx
        /* harmony import */
        var processBar___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var processBar___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(processBar___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_processbar__ = __webpack_require__("./src/styles/components/_processbar.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_processbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_processbar__);


        let ProcessBar = class ProcessBar extends processBar___WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
            constructor(props) {
                super(props);
                this.state = {
                    style: {
                        width: "100%"
                    }
                };
            }

            render() {
                return React.createElement(
                    "div",
                    {className: __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_processbar___default.a.processbar, style: {zIndex: 8}},
                    React.createElement("div", {className: __WEBPACK_IMPORTED_MODULE_1_StyleSheets_components_processbar___default.a.hideprocessbar, style: this.state.style})
                );
            }
        };

// CONCATENATED MODULE: ./src/layout/main.jsx
        /* harmony import */
        var main___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var main___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(main___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__("./node_modules/react-router/es/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__("./node_modules/prop-types/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_StyleSheets_layout_mainLayout__ = __webpack_require__("./src/styles/layout/_mainLayout.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_StyleSheets_layout_mainLayout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_StyleSheets_layout_mainLayout__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9_StyleSheets_themes_light__ = __webpack_require__("./src/styles/themes/_light.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9_StyleSheets_themes_light___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_StyleSheets_themes_light__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10_classnames__ = __webpack_require__("./node_modules/classnames/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_classnames__);
        var main__class, main__temp;


        let main_MainLayout = (main__temp = main__class = class MainLayout extends main___WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

            render() {
                const url = this.props.match.url;
                const classes = __WEBPACK_IMPORTED_MODULE_10_classnames___default()(__WEBPACK_IMPORTED_MODULE_8_StyleSheets_layout_mainLayout___default.a.mainlayout, __WEBPACK_IMPORTED_MODULE_9_StyleSheets_themes_light___default.a.light);
                return React.createElement(
                    "div",
                    {className: classes},
                    React.createElement(ProcessBar, null),
                    React.createElement(header_Header, {nav: header_defaultExport}),
                    React.createElement(article_Article, null),
                    React.createElement(Footer, {nav: footer_defaultExport}),
                    React.createElement(__WEBPACK_IMPORTED_MODULE_4_react_router__["Route"], {path: `${url}/:path/:bookSrc`, component: book_defaultExport}),
                    React.createElement(FileImageInputButton_defaultExport, {
                        src: "https://cdn2.iconfinder.com/data/icons/music-bento/100/stop-512.png",
                        callback: ddcatPluginLoader_defaultExport.installNewPlugin
                    })
                );
            }
        }, main__class.propTypes = {
            match: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object.isRequired,
            location: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object.isRequired,
            history: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object.isRequired
        }, main__temp);


        /* harmony default export */
        var main_defaultExport = (Object(__WEBPACK_IMPORTED_MODULE_4_react_router__["withRouter"])(main_MainLayout));
// CONCATENATED MODULE: ./src/styles/index.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__main_scss__ = __webpack_require__("./src/styles/main.scss");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_scss__);

        /* harmony default export */
        var styles_defaultExport = (__WEBPACK_IMPORTED_MODULE_0__main_scss___default.a);
// CONCATENATED MODULE: ./src/sited.js
        /* harmony import */
        var sited___WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
        /* harmony import */
        var sited___WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(sited___WEBPACK_IMPORTED_MODULE_0_react__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_react_dnd_html5_backend__ = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_react_dnd_html5_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd_html5_backend__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_react_dnd__ = __webpack_require__("./node_modules/react-dnd/lib/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dnd__);
        var sited__dec, sited__class;


        let sited_App = (sited__dec = Object(__WEBPACK_IMPORTED_MODULE_3_react_dnd__["DragDropContext"])(__WEBPACK_IMPORTED_MODULE_2_react_dnd_html5_backend___default.a), sited__dec(sited__class = class App extends sited___WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
            render() {
                return sited___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    body_defaultExport,
                    {className: styles_defaultExport.sited},
                    sited___WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(main_defaultExport, null)
                );
            }
        }) || sited__class);

// CONCATENATED MODULE: ./src/services/standloneDomManipulation/monitorScrollBar.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


        const monitorScrollBar_dispatch = monitorScrollDirection_updateScrollDirection(store.dispatch);

        /* harmony default export */
        var monitorScrollBar_defaultExport = (function () {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on("scroll", function (e) {
                monitorScrollBar_dispatch(e);
            });
        });
// CONCATENATED MODULE: ./src/services/index.js


        function init() {
            //monitorScrollBar();
        }

// CONCATENATED MODULE: ./src/app.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("./node_modules/react-redux/es/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_react_router_redux__ = __webpack_require__("./node_modules/react-router-redux/es/index.js");
        /* harmony import */
        var app___WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__("./node_modules/react-router/es/index.js");


        init();
        /* ConnectedRouter will use the store from Provider automatically */
        /* harmony default export */
        var app_defaultExport = (React.createElement(
            __WEBPACK_IMPORTED_MODULE_0_react_redux__["Provider"],
            {store: store},
            React.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_router_redux__["ConnectedRouter"],
                {history: store_history},
                React.createElement(app___WEBPACK_IMPORTED_MODULE_4_react_router__["Route"], {path: "/sited", component: sited_App})
            )
        ));
// CONCATENATED MODULE: ./src/renderApp.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_react_dom__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_dom__);


        function renderApp(dom) {
            Object(__WEBPACK_IMPORTED_MODULE_0_react_dom__["render"])(app_defaultExport, dom);
        }

        /* harmony default export */
        __webpack_exports__["a"] = (renderApp);

        /***/
    }),

    /***/ "./src/services/ddcatPluginLoader/abstractedPluginContainer.js": /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function () {
            return AbstractedPluginContainer;
        });
        let AbstractedPluginContainer = class AbstractedPluginContainer {
            constructor() {
                this.supportParseOptions = ["parse", "parseUrl", "buildUrl", "buildArgs", "buildCookie", "buildRef", "buildHeader"];
            }

        };


        /***/
    }),

    /***/ "./src/services/ddcatPluginLoader/pluginContainer.js": /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_q__ = __webpack_require__("./node_modules/q/q.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_q___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_q__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__exchangeAPI__ = __webpack_require__("./src/services/exchangeAPI/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__abstractedPluginContainer__ = __webpack_require__("./src/services/ddcatPluginLoader/abstractedPluginContainer.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__exchangeAPI_sandbox_sandbox__ = __webpack_require__("./src/services/exchangeAPI/sandbox/sandbox.js");


        let DDCatPluginContainer = class DDCatPluginContainer extends __WEBPACK_IMPORTED_MODULE_3__abstractedPluginContainer__["a" /* default */] {
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
                const $xml = __WEBPACK_IMPORTED_MODULE_2_jquery___default()(xmlDoc);
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
                        this.sandbox = new __WEBPACK_IMPORTED_MODULE_4__exchangeAPI_sandbox_sandbox__["a" /* default */](code);
                    } catch (e) {
                        console.log("javascript run-time compile error");
                        throw e;
                    }
                } catch (e) {
                    console.log(e);
                    throw {message: "插件不是正确的格式"};
                }
            }

            init() {
                this.title = this.plugin.xpath("//title[position()=1]").text();
                this.expr = this.plugin.xpath("//expr[position()=1]").text();
            }

            initialize() {
                const expr = this.plugin.xpath("/site/main//*[@url or @expr]");
                const listOfMatch = [];
                expr.each(function (i, e) {
                    let re;
                    if (__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e).attr("url")) {
                        re = new RegExp("^" + __WEBPACK_IMPORTED_MODULE_2_jquery___default()(e).attr("url").replace(/&amp;/g, "&").replace(/([.\\/?])/g, "\\$1").replace("@page", "\\d+").replace("@key", ".*") + "/*$", "i");
                    } else if (__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e).attr("expr")) {
                        re = new RegExp(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e).attr("expr"));
                    } else {
                        console.log(e, "does'n seem to be a right NodeSet");
                    }
                    if (window.location.toString().match(re)) {
                        listOfMatch.push({regex: re, element: e});
                    }
                });
                console.log("this sited could be one of the following ", listOfMatch);
                let maxItem = {length: 0};
                __WEBPACK_IMPORTED_MODULE_2_jquery___default.a.each(listOfMatch, function (i, item) {
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
        };


        DDCatPluginContainer.prototype.exec = function (command) {
            this.eventBus.emit(command);
        };
        DDCatPluginContainer.prototype.saveConfig = function () {
            console.log("saving config");
            Object(__WEBPACK_IMPORTED_MODULE_1__exchangeAPI__["e" /* saveToLocal */])("ddcatConfig", this._configs);
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
                    this[e] = Object(__WEBPACK_IMPORTED_MODULE_1__exchangeAPI__["f" /* trace */])()(this.constructor.prototype[e]);
                }
            }
        };
        DDCatPluginContainer.prototype.redirect = function (option, config) {
            const method = option.method || config.method || "GET";
            if (option.url) {
                alert("starts redirection, jump to " + option.url + " with " + option.method + " " + option.body);
                try {
                    __WEBPACK_IMPORTED_MODULE_2_jquery___default.a.redirect(option.url, option.body || "", method, "_blank");
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
                            header.append(k.trim(), v && v.trim() || "");
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
            let deferred = __WEBPACK_IMPORTED_MODULE_0_q___default.a.defer();
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
                __WEBPACK_IMPORTED_MODULE_0_q___default.a.allSettled(promises).then(function (results) {
                    const r = Object(__WEBPACK_IMPORTED_MODULE_1__exchangeAPI__["a" /* concatNarrays */])(...results.map(function (result) {
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
            this.parseUrl(config.url, config.html, config).then(function (results) {
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
            }).then(function (listOfObj) {
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
            if (typeof parser === "function" || typeof parser === "string") {
                return Object(__WEBPACK_IMPORTED_MODULE_1__exchangeAPI__["f" /* trace */])()(globalContext[parser] || eval("(function(){return " + parser + "})()"), this);
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
            if (Object.keys(this._config).length === 0) {
                this.syncCurrentConfig();
            }
            return this._config;
        };
        DDCatPluginContainer.prototype.syncCurrentConfig = function () {
            let config = this.matchCurrentSite(Object(__WEBPACK_IMPORTED_MODULE_1__exchangeAPI__["b" /* getCurrentUrl */])(), this._configs);
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
                            let xmlDoc = __WEBPACK_IMPORTED_MODULE_2_jquery___default.a.parseXML(this._configs[e].sited);
                            let $xml = __WEBPACK_IMPORTED_MODULE_2_jquery___default()(xmlDoc);
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
            __WEBPACK_IMPORTED_MODULE_2_jquery___default()(NodeSet).xpath("ancestor-or-self::*").each(function (i, parent) {
                Object.assign(currentConfig, cacheThis.generateAttrNode(parent));
            });
            currentConfig.subConfigs = this.buildChildrenConfig(NodeSet);
            if (currentConfig) {
                currentConfig.cookies = Object(__WEBPACK_IMPORTED_MODULE_1__exchangeAPI__["c" /* getPageCookieReference */])();
                currentConfig.url = Object(__WEBPACK_IMPORTED_MODULE_1__exchangeAPI__["b" /* getCurrentUrl */])();
                currentConfig.html = Object(__WEBPACK_IMPORTED_MODULE_1__exchangeAPI__["d" /* getPageText */])();
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
                Array.from(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(currentNode).xpath("@*")).forEach(function (x) {
                    try {
                        attributeSet[x.nodeName] = __WEBPACK_IMPORTED_MODULE_2_jquery___default()(x).val();
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
            let childrenElements = Array.from(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(currentNode).xpath("child::*"));
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

        /* harmony default export */
        __webpack_exports__["a"] = (DDCatPluginContainer);

        /***/
    }),

    /***/ "./src/services/exchangeAPI/index.js": /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {value: true});

// CONCATENATED MODULE: ./src/actions/allPlugin.js
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__("./src/actions/index.js");


        function allPlugins(plugins) {
            return {
                type: __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].listPlugins,
                payload: plugins
            };
        }

// CONCATENATED MODULE: ./src/services/exchangeAPI/index.js
        /* harmony export (immutable) */
        __webpack_exports__["f"] = trace;
        /* harmony export (immutable) */
        __webpack_exports__["d"] = getPageText;
        /* harmony export (immutable) */
        __webpack_exports__["b"] = getCurrentUrl;
        /* harmony export (immutable) */
        __webpack_exports__["c"] = getPageCookieReference;
        /* harmony export (immutable) */
        __webpack_exports__["e"] = saveToLocal;
        /* harmony export (immutable) */
        __webpack_exports__["a"] = concatNarrays;
// import { store } from "../../store";

        const callingHistory = [];
        const globalContext = this;

        function trace() {
            return func => {
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

        function getPageText() {
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

        function getCurrentUrl() {
            return window.location.toString();
        }

        function getPageCookieReference() {
            return document.cookie;
        }

        function saveToLocal(objectKey, objectValue) {
            store.dispatch(allPlugins(objectValue));
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

        function concatNarrays() {
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

        /***/
    }),

    /***/ "./src/services/exchangeAPI/sandbox/sandbox.js": /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function () {
            return Sandbox;
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);

        function _asyncToGenerator(fn) {
            return function () {
                var gen = fn.apply(this, arguments);
                return new Promise(function (resolve, reject) {
                    function step(key, arg) {
                        try {
                            var info = gen[key](arg);
                            var value = info.value;
                        } catch (error) {
                            reject(error);
                            return;
                        }
                        if (info.done) { resolve(value); } else {
                            return Promise.resolve(value).then(function (value) {
                                step("next", value);
                            }, function (err) {
                                step("throw", err);
                            });
                        }
                    }

                    return step("next");
                });
            };
        }


        let Sandbox = class Sandbox {
            constructor(plugin) {
                // unique id for detecting iframe
                this.sandboxID = `sandbox${Math.random() * Math.pow(10, Math.random().toString().length)}${new Date().getTime()}`;
                this.executionSchedule = {};
                this.startMonitoring();
                const pluginScript = `<script>const print = console.log;${plugin && plugin.toString() || ""};</script>`;
                const monitorService = `function ${this.receiveMessage.toString()};`;
                const startMonitoring = `(function(){window.sandboxID="${this.sandboxID}";window.addEventListener("message", receiveMessage);})();`;
                const serviceScript = `<script>${monitorService}${startMonitoring}</script>`;
                const html = `<html><head>${pluginScript}${serviceScript}</head><body></body></html>`;
                const blob = new Blob([html], {type: "text/html"});
                const url = URL.createObjectURL(blob);
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()("<iframe>", {
                    id: this.sandboxID,
                    src: url,
                    style: "display:none",
                    sandbox: "allow-scripts"
                }).appendTo(__WEBPACK_IMPORTED_MODULE_0_jquery___default()("body"));
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
                    const syncFunction = event => {
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
            }

            startMonitoring() {
                window.addEventListener("message", this.receiveMessage.bind(this));
            }

            generaetFunctionProxy(functionName) {
                return (() => {
                    var _ref = _asyncToGenerator(function*(...rest) {
                        return this.execute(`${functionName}(${JSON.stringify(rest).slice(1, -1)})`);
                    });

                    function proxy() {
                        return _ref.apply(this, arguments);
                    }

                    return proxy;
                })();
            }

            execute(jscode, callback) {
                if (callback && !__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.isFunction(callback)) {
                    throw new Error("callback need to be a function");
                }
                if (__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.isFunction(jscode)) {
                    jscode = jscode.toString();
                }
                return new Promise((resolve, reject) => {
                    if (typeof jscode === "string" || __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.isFunction(jscode)) {
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
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${this.sandboxID}`)[0].contentWindow.postMessage({
                            sandboxID: this.sandboxID,
                            actionID: actionID,
                            type: "execute",
                            payload: jscode
                        }, "*");
                    }
                });
            }
        };


        /***/
    }),

    /***/ "./src/styles/components/_book.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {"book": "_book__book___3LKmK", "hide": "_book__hide___RlWWj", "show": "_book__show___h5cV0"};

        /***/
    }),

    /***/ "./src/styles/components/_card.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {
            "descriptioncontainer": "_card__descriptioncontainer___mFfyW",
            "card": "_card__card___3W1re",
            "cardcontainer": "_card__cardcontainer___zumkF",
            "isdragging": "_card__isdragging___1OZ4V"
        };

        /***/
    }),

    /***/ "./src/styles/components/_home.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {"ishidden": "_home__ishidden___1us__"};

        /***/
    }),

    /***/ "./src/styles/components/_iframebook.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {"iframebook": "_iframebook__iframebook___17jLN"};

        /***/
    }),

    /***/ "./src/styles/components/_processbar.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {"processbar": "_processbar__processbar___1p2x-", "hideprocessbar": "_processbar__hideprocessbar___me8hF"};

        /***/
    }),

    /***/ "./src/styles/layout/_footer.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {"footer": "_footer__footer___38XqG"};

        /***/
    }),

    /***/ "./src/styles/layout/_mainLayout.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {"mainlayout": "_mainLayout__mainlayout___iH7jI"};

        /***/
    }),

    /***/ "./src/styles/layout/header/_header.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {
            "ishidden": "_header__ishidden___3A_tg",
            "navigator": "_header__navigator____xKWY",
            "header": "_header__header___1MIDG",
            "link": "_header__link___2sX3H"
        };

        /***/
    }),

    /***/ "./src/styles/layout/header/_navigator.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {"navigator": "_navigator__navigator___2F-3r"};

        /***/
    }),

    /***/ "./src/styles/layout/header/_searchbar.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {"searchbar": "_searchbar__searchbar___2a7k3"};

        /***/
    }),

    /***/ "./src/styles/main.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {
            "sited": "main__sited___2Go3q",
            "descriptioncontainer": "main__descriptioncontainer___12FJ1",
            "card": "main__card___QUsnT",
            "cardcontainer": "main__cardcontainer___ZuUff",
            "isdragging": "main__isdragging___3h_0Q",
            "book": "main__book___2vBnT",
            "hide": "main__hide___1984K",
            "show": "main__show___1iXiu",
            "iframebook": "main__iframebook___3LyJx"
        };

        /***/
    }),

    /***/ "./src/styles/themes/_light.scss": /***/ (function (module, exports) {

// removed by extract-text-webpack-plugin
        module.exports = {"light": "_light__light___3P70w"};

        /***/
    }),

    /***/ "./src/utils/b64.js": /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "b", function () {
            return b64EncodeUnicode;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function () {
            return b64DecodeUnicode;
        });
        function b64EncodeUnicode(str) {
            // first we use encodeURIComponent to get percent-encoded UTF-8,
            // then we convert the percent encodings into raw bytes which
            // can be fed into btoa.
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
                return String.fromCharCode("0x" + p1);
            }));
        }

        function b64DecodeUnicode(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split("").map(function (c) {
                return `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`;
            }).join(""));
        }


        /***/
    }),

    /***/ 1: /***/ (function (module, exports) {

        module.exports = jQuery;

        /***/
    }),

    /***/ 2: /***/ (function (module, exports) {

        module.exports = Rx;

        /***/
    }),

    /***/ 3: /***/ (function (module, exports) {

        module.exports = Immutable;

        /***/
    }),

    /***/ 7: /***/ (function (module, exports) {

        module.exports = ReactDOM;

        /***/
    })

}, ["./src/index.js"]);
//# sourceMappingURL=sited.js.map