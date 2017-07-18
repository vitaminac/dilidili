webpackJsonp([1], {

    /***/ "./node_modules/dnd-core/lib/DragDropManager.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _createStore = __webpack_require__("./node_modules/redux/lib/createStore.js");

        var _createStore2 = _interopRequireDefault(_createStore);

        var _reducers = __webpack_require__("./node_modules/dnd-core/lib/reducers/index.js");

        var _reducers2 = _interopRequireDefault(_reducers);

        var _dragDrop = __webpack_require__("./node_modules/dnd-core/lib/actions/dragDrop.js");

        var dragDropActions = _interopRequireWildcard(_dragDrop);

        var _DragDropMonitor = __webpack_require__("./node_modules/dnd-core/lib/DragDropMonitor.js");

        var _DragDropMonitor2 = _interopRequireDefault(_DragDropMonitor);

        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) { return obj; } else {
                var newObj = {};
                if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
                newObj.default = obj;
                return newObj;
            }
        }

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var DragDropManager = function () {
            function DragDropManager(createBackend) {
                var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                _classCallCheck(this, DragDropManager);

                var store = (0, _createStore2.default)(_reducers2.default);
                this.context = context;
                this.store = store;
                this.monitor = new _DragDropMonitor2.default(store);
                this.registry = this.monitor.registry;
                this.backend = createBackend(this);

                store.subscribe(this.handleRefCountChange.bind(this));
            }

            _createClass(DragDropManager, [{
                key: "handleRefCountChange",
                value: function handleRefCountChange() {
                    var shouldSetUp = this.store.getState().refCount > 0;
                    if (shouldSetUp && !this.isSetUp) {
                        this.backend.setup();
                        this.isSetUp = true;
                    } else if (!shouldSetUp && this.isSetUp) {
                        this.backend.teardown();
                        this.isSetUp = false;
                    }
                }
            }, {
                key: "getContext",
                value: function getContext() {
                    return this.context;
                }
            }, {
                key: "getMonitor",
                value: function getMonitor() {
                    return this.monitor;
                }
            }, {
                key: "getBackend",
                value: function getBackend() {
                    return this.backend;
                }
            }, {
                key: "getRegistry",
                value: function getRegistry() {
                    return this.registry;
                }
            }, {
                key: "getActions",
                value: function getActions() {
                    var manager = this;
                    var dispatch = this.store.dispatch;


                    function bindActionCreator(actionCreator) {
                        return function () {
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key];
                            }

                            var action = actionCreator.apply(manager, args);
                            if (typeof action !== "undefined") {
                                dispatch(action);
                            }
                        };
                    }

                    return Object.keys(dragDropActions).filter(function (key) {
                        return typeof dragDropActions[key] === "function";
                    }).reduce(function (boundActions, key) {
                        var action = dragDropActions[key];
                        boundActions[key] = bindActionCreator(action); // eslint-disable-line no-param-reassign
                        return boundActions;
                    }, {});
                }
            }]);

            return DragDropManager;
        }();

        exports.default = DragDropManager;

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/DragDropMonitor.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _isArray = __webpack_require__("./node_modules/lodash/isArray.js");

        var _isArray2 = _interopRequireDefault(_isArray);

        var _matchesType = __webpack_require__("./node_modules/dnd-core/lib/utils/matchesType.js");

        var _matchesType2 = _interopRequireDefault(_matchesType);

        var _HandlerRegistry = __webpack_require__("./node_modules/dnd-core/lib/HandlerRegistry.js");

        var _HandlerRegistry2 = _interopRequireDefault(_HandlerRegistry);

        var _dragOffset = __webpack_require__("./node_modules/dnd-core/lib/reducers/dragOffset.js");

        var _dirtyHandlerIds = __webpack_require__("./node_modules/dnd-core/lib/reducers/dirtyHandlerIds.js");

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var DragDropMonitor = function () {
            function DragDropMonitor(store) {
                _classCallCheck(this, DragDropMonitor);

                this.store = store;
                this.registry = new _HandlerRegistry2.default(store);
            }

            _createClass(DragDropMonitor, [{
                key: "subscribeToStateChange",
                value: function subscribeToStateChange(listener) {
                    var _this = this;

                    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                    var handlerIds = options.handlerIds;

                    (0, _invariant2.default)(typeof listener === "function", "listener must be a function.");
                    (0, _invariant2.default)(typeof handlerIds === "undefined" || (0, _isArray2.default)(handlerIds), "handlerIds, when specified, must be an array of strings.");

                    var prevStateId = this.store.getState().stateId;
                    var handleChange = function handleChange() {
                        var state = _this.store.getState();
                        var currentStateId = state.stateId;
                        try {
                            var canSkipListener = currentStateId === prevStateId || currentStateId === prevStateId + 1 && !(0, _dirtyHandlerIds.areDirty)(state.dirtyHandlerIds, handlerIds);

                            if (!canSkipListener) {
                                listener();
                            }
                        } finally {
                            prevStateId = currentStateId;
                        }
                    };

                    return this.store.subscribe(handleChange);
                }
            }, {
                key: "subscribeToOffsetChange",
                value: function subscribeToOffsetChange(listener) {
                    var _this2 = this;

                    (0, _invariant2.default)(typeof listener === "function", "listener must be a function.");

                    var previousState = this.store.getState().dragOffset;
                    var handleChange = function handleChange() {
                        var nextState = _this2.store.getState().dragOffset;
                        if (nextState === previousState) {
                            return;
                        }

                        previousState = nextState;
                        listener();
                    };

                    return this.store.subscribe(handleChange);
                }
            }, {
                key: "canDragSource",
                value: function canDragSource(sourceId) {
                    var source = this.registry.getSource(sourceId);
                    (0, _invariant2.default)(source, "Expected to find a valid source.");

                    if (this.isDragging()) {
                        return false;
                    }

                    return source.canDrag(this, sourceId);
                }
            }, {
                key: "canDropOnTarget",
                value: function canDropOnTarget(targetId) {
                    var target = this.registry.getTarget(targetId);
                    (0, _invariant2.default)(target, "Expected to find a valid target.");

                    if (!this.isDragging() || this.didDrop()) {
                        return false;
                    }

                    var targetType = this.registry.getTargetType(targetId);
                    var draggedItemType = this.getItemType();
                    return (0, _matchesType2.default)(targetType, draggedItemType) && target.canDrop(this, targetId);
                }
            }, {
                key: "isDragging",
                value: function isDragging() {
                    return Boolean(this.getItemType());
                }
            }, {
                key: "isDraggingSource",
                value: function isDraggingSource(sourceId) {
                    var source = this.registry.getSource(sourceId, true);
                    (0, _invariant2.default)(source, "Expected to find a valid source.");

                    if (!this.isDragging() || !this.isSourcePublic()) {
                        return false;
                    }

                    var sourceType = this.registry.getSourceType(sourceId);
                    var draggedItemType = this.getItemType();
                    if (sourceType !== draggedItemType) {
                        return false;
                    }

                    return source.isDragging(this, sourceId);
                }
            }, {
                key: "isOverTarget",
                value: function isOverTarget(targetId) {
                    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {shallow: false};
                    var shallow = options.shallow;

                    if (!this.isDragging()) {
                        return false;
                    }

                    var targetType = this.registry.getTargetType(targetId);
                    var draggedItemType = this.getItemType();
                    if (!(0, _matchesType2.default)(targetType, draggedItemType)) {
                        return false;
                    }

                    var targetIds = this.getTargetIds();
                    if (!targetIds.length) {
                        return false;
                    }

                    var index = targetIds.indexOf(targetId);
                    if (shallow) {
                        return index === targetIds.length - 1;
                    } else {
                        return index > -1;
                    }
                }
            }, {
                key: "getItemType",
                value: function getItemType() {
                    return this.store.getState().dragOperation.itemType;
                }
            }, {
                key: "getItem",
                value: function getItem() {
                    return this.store.getState().dragOperation.item;
                }
            }, {
                key: "getSourceId",
                value: function getSourceId() {
                    return this.store.getState().dragOperation.sourceId;
                }
            }, {
                key: "getTargetIds",
                value: function getTargetIds() {
                    return this.store.getState().dragOperation.targetIds;
                }
            }, {
                key: "getDropResult",
                value: function getDropResult() {
                    return this.store.getState().dragOperation.dropResult;
                }
            }, {
                key: "didDrop",
                value: function didDrop() {
                    return this.store.getState().dragOperation.didDrop;
                }
            }, {
                key: "isSourcePublic",
                value: function isSourcePublic() {
                    return this.store.getState().dragOperation.isSourcePublic;
                }
            }, {
                key: "getInitialClientOffset",
                value: function getInitialClientOffset() {
                    return this.store.getState().dragOffset.initialClientOffset;
                }
            }, {
                key: "getInitialSourceClientOffset",
                value: function getInitialSourceClientOffset() {
                    return this.store.getState().dragOffset.initialSourceClientOffset;
                }
            }, {
                key: "getClientOffset",
                value: function getClientOffset() {
                    return this.store.getState().dragOffset.clientOffset;
                }
            }, {
                key: "getSourceClientOffset",
                value: function getSourceClientOffset() {
                    return (0, _dragOffset.getSourceClientOffset)(this.store.getState().dragOffset);
                }
            }, {
                key: "getDifferenceFromInitialOffset",
                value: function getDifferenceFromInitialOffset() {
                    return (0, _dragOffset.getDifferenceFromInitialOffset)(this.store.getState().dragOffset);
                }
            }]);

            return DragDropMonitor;
        }();

        exports.default = DragDropMonitor;

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/DragSource.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var DragSource = function () {
            function DragSource() {
                _classCallCheck(this, DragSource);
            }

            _createClass(DragSource, [{
                key: "canDrag",
                value: function canDrag() {
                    return true;
                }
            }, {
                key: "isDragging",
                value: function isDragging(monitor, handle) {
                    return handle === monitor.getSourceId();
                }
            }, {
                key: "endDrag",
                value: function endDrag() {
                }
            }]);

            return DragSource;
        }();

        exports.default = DragSource;

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/DropTarget.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var DropTarget = function () {
            function DropTarget() {
                _classCallCheck(this, DropTarget);
            }

            _createClass(DropTarget, [{
                key: "canDrop",
                value: function canDrop() {
                    return true;
                }
            }, {
                key: "hover",
                value: function hover() {
                }
            }, {
                key: "drop",
                value: function drop() {
                }
            }]);

            return DropTarget;
        }();

        exports.default = DropTarget;

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/HandlerRegistry.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _isArray = __webpack_require__("./node_modules/lodash/isArray.js");

        var _isArray2 = _interopRequireDefault(_isArray);

        var _asap = __webpack_require__("./node_modules/asap/browser-asap.js");

        var _asap2 = _interopRequireDefault(_asap);

        var _registry = __webpack_require__("./node_modules/dnd-core/lib/actions/registry.js");

        var _getNextUniqueId = __webpack_require__("./node_modules/dnd-core/lib/utils/getNextUniqueId.js");

        var _getNextUniqueId2 = _interopRequireDefault(_getNextUniqueId);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var HandlerRoles = {
            SOURCE: "SOURCE",
            TARGET: "TARGET"
        };

        function validateSourceContract(source) {
            (0, _invariant2.default)(typeof source.canDrag === "function", "Expected canDrag to be a function.");
            (0, _invariant2.default)(typeof source.beginDrag === "function", "Expected beginDrag to be a function.");
            (0, _invariant2.default)(typeof source.endDrag === "function", "Expected endDrag to be a function.");
        }

        function validateTargetContract(target) {
            (0, _invariant2.default)(typeof target.canDrop === "function", "Expected canDrop to be a function.");
            (0, _invariant2.default)(typeof target.hover === "function", "Expected hover to be a function.");
            (0, _invariant2.default)(typeof target.drop === "function", "Expected beginDrag to be a function.");
        }

        function validateType(type, allowArray) {
            if (allowArray && (0, _isArray2.default)(type)) {
                type.forEach(function (t) {
                    return validateType(t, false);
                });
                return;
            }

            (0, _invariant2.default)(typeof type === "string" || (typeof type === "undefined" ? "undefined" : _typeof(type)) === "symbol", allowArray ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
        }

        function getNextHandlerId(role) {
            var id = (0, _getNextUniqueId2.default)().toString();
            switch (role) {
                case HandlerRoles.SOURCE:
                    return "S" + id;
                case HandlerRoles.TARGET:
                    return "T" + id;
                default:
                    (0, _invariant2.default)(false, "Unknown role: " + role);
            }
        }

        function parseRoleFromHandlerId(handlerId) {
            switch (handlerId[0]) {
                case "S":
                    return HandlerRoles.SOURCE;
                case "T":
                    return HandlerRoles.TARGET;
                default:
                    (0, _invariant2.default)(false, "Cannot parse handler ID: " + handlerId);
            }
        }

        var HandlerRegistry = function () {
            function HandlerRegistry(store) {
                _classCallCheck(this, HandlerRegistry);

                this.store = store;

                this.types = {};
                this.handlers = {};

                this.pinnedSourceId = null;
                this.pinnedSource = null;
            }

            _createClass(HandlerRegistry, [{
                key: "addSource",
                value: function addSource(type, source) {
                    validateType(type);
                    validateSourceContract(source);

                    var sourceId = this.addHandler(HandlerRoles.SOURCE, type, source);
                    this.store.dispatch((0, _registry.addSource)(sourceId));
                    return sourceId;
                }
            }, {
                key: "addTarget",
                value: function addTarget(type, target) {
                    validateType(type, true);
                    validateTargetContract(target);

                    var targetId = this.addHandler(HandlerRoles.TARGET, type, target);
                    this.store.dispatch((0, _registry.addTarget)(targetId));
                    return targetId;
                }
            }, {
                key: "addHandler",
                value: function addHandler(role, type, handler) {
                    var id = getNextHandlerId(role);
                    this.types[id] = type;
                    this.handlers[id] = handler;

                    return id;
                }
            }, {
                key: "containsHandler",
                value: function containsHandler(handler) {
                    var _this = this;

                    return Object.keys(this.handlers).some(function (key) {
                        return _this.handlers[key] === handler;
                    });
                }
            }, {
                key: "getSource",
                value: function getSource(sourceId, includePinned) {
                    (0, _invariant2.default)(this.isSourceId(sourceId), "Expected a valid source ID.");

                    var isPinned = includePinned && sourceId === this.pinnedSourceId;
                    var source = isPinned ? this.pinnedSource : this.handlers[sourceId];

                    return source;
                }
            }, {
                key: "getTarget",
                value: function getTarget(targetId) {
                    (0, _invariant2.default)(this.isTargetId(targetId), "Expected a valid target ID.");
                    return this.handlers[targetId];
                }
            }, {
                key: "getSourceType",
                value: function getSourceType(sourceId) {
                    (0, _invariant2.default)(this.isSourceId(sourceId), "Expected a valid source ID.");
                    return this.types[sourceId];
                }
            }, {
                key: "getTargetType",
                value: function getTargetType(targetId) {
                    (0, _invariant2.default)(this.isTargetId(targetId), "Expected a valid target ID.");
                    return this.types[targetId];
                }
            }, {
                key: "isSourceId",
                value: function isSourceId(handlerId) {
                    var role = parseRoleFromHandlerId(handlerId);
                    return role === HandlerRoles.SOURCE;
                }
            }, {
                key: "isTargetId",
                value: function isTargetId(handlerId) {
                    var role = parseRoleFromHandlerId(handlerId);
                    return role === HandlerRoles.TARGET;
                }
            }, {
                key: "removeSource",
                value: function removeSource(sourceId) {
                    var _this2 = this;

                    (0, _invariant2.default)(this.getSource(sourceId), "Expected an existing source.");
                    this.store.dispatch((0, _registry.removeSource)(sourceId));

                    (0, _asap2.default)(function () {
                        delete _this2.handlers[sourceId];
                        delete _this2.types[sourceId];
                    });
                }
            }, {
                key: "removeTarget",
                value: function removeTarget(targetId) {
                    var _this3 = this;

                    (0, _invariant2.default)(this.getTarget(targetId), "Expected an existing target.");
                    this.store.dispatch((0, _registry.removeTarget)(targetId));

                    (0, _asap2.default)(function () {
                        delete _this3.handlers[targetId];
                        delete _this3.types[targetId];
                    });
                }
            }, {
                key: "pinSource",
                value: function pinSource(sourceId) {
                    var source = this.getSource(sourceId);
                    (0, _invariant2.default)(source, "Expected an existing source.");

                    this.pinnedSourceId = sourceId;
                    this.pinnedSource = source;
                }
            }, {
                key: "unpinSource",
                value: function unpinSource() {
                    (0, _invariant2.default)(this.pinnedSource, "No source is pinned at the time.");

                    this.pinnedSourceId = null;
                    this.pinnedSource = null;
                }
            }]);

            return HandlerRegistry;
        }();

        exports.default = HandlerRegistry;

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/actions/dragDrop.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.END_DRAG = exports.DROP = exports.HOVER = exports.PUBLISH_DRAG_SOURCE = exports.BEGIN_DRAG = undefined;

        var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } }
                }
                return target;
            };

        exports.beginDrag = beginDrag;
        exports.publishDragSource = publishDragSource;
        exports.hover = hover;
        exports.drop = drop;
        exports.endDrag = endDrag;

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _isArray = __webpack_require__("./node_modules/lodash/isArray.js");

        var _isArray2 = _interopRequireDefault(_isArray);

        var _isObject = __webpack_require__("./node_modules/lodash/isObject.js");

        var _isObject2 = _interopRequireDefault(_isObject);

        var _matchesType = __webpack_require__("./node_modules/dnd-core/lib/utils/matchesType.js");

        var _matchesType2 = _interopRequireDefault(_matchesType);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        var BEGIN_DRAG = exports.BEGIN_DRAG = "dnd-core/BEGIN_DRAG";
        var PUBLISH_DRAG_SOURCE = exports.PUBLISH_DRAG_SOURCE = "dnd-core/PUBLISH_DRAG_SOURCE";
        var HOVER = exports.HOVER = "dnd-core/HOVER";
        var DROP = exports.DROP = "dnd-core/DROP";
        var END_DRAG = exports.END_DRAG = "dnd-core/END_DRAG";

        function beginDrag(sourceIds) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {publishSource: true, clientOffset: null};
            var publishSource         = options.publishSource,
                clientOffset          = options.clientOffset,
                getSourceClientOffset = options.getSourceClientOffset;

            (0, _invariant2.default)((0, _isArray2.default)(sourceIds), "Expected sourceIds to be an array.");

            var monitor = this.getMonitor();
            var registry = this.getRegistry();
            (0, _invariant2.default)(!monitor.isDragging(), "Cannot call beginDrag while dragging.");

            for (var i = 0; i < sourceIds.length; i++) {
                (0, _invariant2.default)(registry.getSource(sourceIds[i]), "Expected sourceIds to be registered.");
            }

            var sourceId = null;
            for (var _i = sourceIds.length - 1; _i >= 0; _i--) {
                if (monitor.canDragSource(sourceIds[_i])) {
                    sourceId = sourceIds[_i];
                    break;
                }
            }
            if (sourceId === null) {
                return;
            }

            var sourceClientOffset = null;
            if (clientOffset) {
                (0, _invariant2.default)(typeof getSourceClientOffset === "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
                sourceClientOffset = getSourceClientOffset(sourceId);
            }

            var source = registry.getSource(sourceId);
            var item = source.beginDrag(monitor, sourceId);
            (0, _invariant2.default)((0, _isObject2.default)(item), "Item must be an object.");

            registry.pinSource(sourceId);

            var itemType = registry.getSourceType(sourceId);
            return {
                type: BEGIN_DRAG,
                itemType: itemType,
                item: item,
                sourceId: sourceId,
                clientOffset: clientOffset,
                sourceClientOffset: sourceClientOffset,
                isSourcePublic: publishSource
            };
        }

        function publishDragSource() {
            var monitor = this.getMonitor();
            if (!monitor.isDragging()) {
                return;
            }

            return {type: PUBLISH_DRAG_SOURCE};
        }

        function hover(targetIdsArg) {
            var _ref              = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref$clientOffset = _ref.clientOffset,
                clientOffset      = _ref$clientOffset === undefined ? null : _ref$clientOffset;

            (0, _invariant2.default)((0, _isArray2.default)(targetIdsArg), "Expected targetIds to be an array.");
            var targetIds = targetIdsArg.slice(0);

            var monitor = this.getMonitor();
            var registry = this.getRegistry();
            (0, _invariant2.default)(monitor.isDragging(), "Cannot call hover while not dragging.");
            (0, _invariant2.default)(!monitor.didDrop(), "Cannot call hover after drop.");

            // First check invariants.
            for (var i = 0; i < targetIds.length; i++) {
                var targetId = targetIds[i];
                (0, _invariant2.default)(targetIds.lastIndexOf(targetId) === i, "Expected targetIds to be unique in the passed array.");

                var target = registry.getTarget(targetId);
                (0, _invariant2.default)(target, "Expected targetIds to be registered.");
            }

            var draggedItemType = monitor.getItemType();

            // Remove those targetIds that don't match the targetType.  This
            // fixes shallow isOver which would only be non-shallow because of
            // non-matching targets.
            for (var _i2 = targetIds.length - 1; _i2 >= 0; _i2--) {
                var _targetId = targetIds[_i2];
                var targetType = registry.getTargetType(_targetId);
                if (!(0, _matchesType2.default)(targetType, draggedItemType)) {
                    targetIds.splice(_i2, 1);
                }
            }

            // Finally call hover on all matching targets.
            for (var _i3 = 0; _i3 < targetIds.length; _i3++) {
                var _targetId2 = targetIds[_i3];
                var _target = registry.getTarget(_targetId2);
                _target.hover(monitor, _targetId2);
            }

            return {
                type: HOVER,
                targetIds: targetIds,
                clientOffset: clientOffset
            };
        }

        function drop() {
            var _this = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var monitor = this.getMonitor();
            var registry = this.getRegistry();
            (0, _invariant2.default)(monitor.isDragging(), "Cannot call drop while not dragging.");
            (0, _invariant2.default)(!monitor.didDrop(), "Cannot call drop twice during one drag operation.");

            var targetIds = monitor.getTargetIds().filter(monitor.canDropOnTarget, monitor);

            targetIds.reverse();
            targetIds.forEach(function (targetId, index) {
                var target = registry.getTarget(targetId);

                var dropResult = target.drop(monitor, targetId);
                (0, _invariant2.default)(typeof dropResult === "undefined" || (0, _isObject2.default)(dropResult), "Drop result must either be an object or undefined.");
                if (typeof dropResult === "undefined") {
                    dropResult = index === 0 ? {} : monitor.getDropResult();
                }

                _this.store.dispatch({
                    type: DROP,
                    dropResult: _extends({}, options, dropResult)
                });
            });
        }

        function endDrag() {
            var monitor = this.getMonitor();
            var registry = this.getRegistry();
            (0, _invariant2.default)(monitor.isDragging(), "Cannot call endDrag while not dragging.");

            var sourceId = monitor.getSourceId();
            var source = registry.getSource(sourceId, true);
            source.endDrag(monitor, sourceId);

            registry.unpinSource();

            return {type: END_DRAG};
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/actions/registry.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.addSource = addSource;
        exports.addTarget = addTarget;
        exports.removeSource = removeSource;
        exports.removeTarget = removeTarget;
        var ADD_SOURCE = exports.ADD_SOURCE = "dnd-core/ADD_SOURCE";
        var ADD_TARGET = exports.ADD_TARGET = "dnd-core/ADD_TARGET";
        var REMOVE_SOURCE = exports.REMOVE_SOURCE = "dnd-core/REMOVE_SOURCE";
        var REMOVE_TARGET = exports.REMOVE_TARGET = "dnd-core/REMOVE_TARGET";

        function addSource(sourceId) {
            return {
                type: ADD_SOURCE,
                sourceId: sourceId
            };
        }

        function addTarget(targetId) {
            return {
                type: ADD_TARGET,
                targetId: targetId
            };
        }

        function removeSource(sourceId) {
            return {
                type: REMOVE_SOURCE,
                sourceId: sourceId
            };
        }

        function removeTarget(targetId) {
            return {
                type: REMOVE_TARGET,
                targetId: targetId
            };
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/backends/createTestBackend.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        exports.default = createBackend;

        var _noop = __webpack_require__("./node_modules/lodash/noop.js");

        var _noop2 = _interopRequireDefault(_noop);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var TestBackend = function () {
            function TestBackend(manager) {
                _classCallCheck(this, TestBackend);

                this.actions = manager.getActions();
            }

            _createClass(TestBackend, [{
                key: "setup",
                value: function setup() {
                    this.didCallSetup = true;
                }
            }, {
                key: "teardown",
                value: function teardown() {
                    this.didCallTeardown = true;
                }
            }, {
                key: "connectDragSource",
                value: function connectDragSource() {
                    return _noop2.default;
                }
            }, {
                key: "connectDragPreview",
                value: function connectDragPreview() {
                    return _noop2.default;
                }
            }, {
                key: "connectDropTarget",
                value: function connectDropTarget() {
                    return _noop2.default;
                }
            }, {
                key: "simulateBeginDrag",
                value: function simulateBeginDrag(sourceIds, options) {
                    this.actions.beginDrag(sourceIds, options);
                }
            }, {
                key: "simulatePublishDragSource",
                value: function simulatePublishDragSource() {
                    this.actions.publishDragSource();
                }
            }, {
                key: "simulateHover",
                value: function simulateHover(targetIds, options) {
                    this.actions.hover(targetIds, options);
                }
            }, {
                key: "simulateDrop",
                value: function simulateDrop() {
                    this.actions.drop();
                }
            }, {
                key: "simulateEndDrag",
                value: function simulateEndDrag() {
                    this.actions.endDrag();
                }
            }]);

            return TestBackend;
        }();

        function createBackend(manager) {
            return new TestBackend(manager);
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/index.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _DragDropManager = __webpack_require__("./node_modules/dnd-core/lib/DragDropManager.js");

        Object.defineProperty(exports, "DragDropManager", {
            enumerable: true,
            get: function get() {
                return _interopRequireDefault(_DragDropManager).default;
            }
        });

        var _DragSource = __webpack_require__("./node_modules/dnd-core/lib/DragSource.js");

        Object.defineProperty(exports, "DragSource", {
            enumerable: true,
            get: function get() {
                return _interopRequireDefault(_DragSource).default;
            }
        });

        var _DropTarget = __webpack_require__("./node_modules/dnd-core/lib/DropTarget.js");

        Object.defineProperty(exports, "DropTarget", {
            enumerable: true,
            get: function get() {
                return _interopRequireDefault(_DropTarget).default;
            }
        });

        var _createTestBackend = __webpack_require__("./node_modules/dnd-core/lib/backends/createTestBackend.js");

        Object.defineProperty(exports, "createTestBackend", {
            enumerable: true,
            get: function get() {
                return _interopRequireDefault(_createTestBackend).default;
            }
        });

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/reducers/dirtyHandlerIds.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = dirtyHandlerIds;
        exports.areDirty = areDirty;

        var _xor = __webpack_require__("./node_modules/lodash/xor.js");

        var _xor2 = _interopRequireDefault(_xor);

        var _intersection = __webpack_require__("./node_modules/lodash/intersection.js");

        var _intersection2 = _interopRequireDefault(_intersection);

        var _dragDrop = __webpack_require__("./node_modules/dnd-core/lib/actions/dragDrop.js");

        var _registry = __webpack_require__("./node_modules/dnd-core/lib/actions/registry.js");

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        var NONE = [];
        var ALL = [];

        function dirtyHandlerIds() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NONE;
            var action = arguments[1];
            var dragOperation = arguments[2];

            switch (action.type) {
                case _dragDrop.HOVER:
                    break;
                case _registry.ADD_SOURCE:
                case _registry.ADD_TARGET:
                case _registry.REMOVE_TARGET:
                case _registry.REMOVE_SOURCE:
                    return NONE;
                case _dragDrop.BEGIN_DRAG:
                case _dragDrop.PUBLISH_DRAG_SOURCE:
                case _dragDrop.END_DRAG:
                case _dragDrop.DROP:
                default:
                    return ALL;
            }

            var targetIds = action.targetIds;
            var prevTargetIds = dragOperation.targetIds;

            var result = (0, _xor2.default)(targetIds, prevTargetIds);

            var didChange = false;
            if (result.length === 0) {
                for (var i = 0; i < targetIds.length; i++) {
                    if (targetIds[i] !== prevTargetIds[i]) {
                        didChange = true;
                        break;
                    }
                }
            } else {
                didChange = true;
            }

            if (!didChange) {
                return NONE;
            }

            var prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1];
            var innermostTargetId = targetIds[targetIds.length - 1];

            if (prevInnermostTargetId !== innermostTargetId) {
                if (prevInnermostTargetId) {
                    result.push(prevInnermostTargetId);
                }
                if (innermostTargetId) {
                    result.push(innermostTargetId);
                }
            }

            return result;
        }

        function areDirty(state, handlerIds) {
            if (state === NONE) {
                return false;
            }

            if (state === ALL || typeof handlerIds === "undefined") {
                return true;
            }

            return (0, _intersection2.default)(handlerIds, state).length > 0;
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/reducers/dragOffset.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } }
                }
                return target;
            };

        exports.default = dragOffset;
        exports.getSourceClientOffset = getSourceClientOffset;
        exports.getDifferenceFromInitialOffset = getDifferenceFromInitialOffset;

        var _dragDrop = __webpack_require__("./node_modules/dnd-core/lib/actions/dragDrop.js");

        var initialState = {
            initialSourceClientOffset: null,
            initialClientOffset: null,
            clientOffset: null
        };

        function areOffsetsEqual(offsetA, offsetB) {
            if (offsetA === offsetB) {
                return true;
            }
            return offsetA && offsetB && offsetA.x === offsetB.x && offsetA.y === offsetB.y;
        }

        function dragOffset() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
            var action = arguments[1];

            switch (action.type) {
                case _dragDrop.BEGIN_DRAG:
                    return {
                        initialSourceClientOffset: action.sourceClientOffset,
                        initialClientOffset: action.clientOffset,
                        clientOffset: action.clientOffset
                    };
                case _dragDrop.HOVER:
                    if (areOffsetsEqual(state.clientOffset, action.clientOffset)) {
                        return state;
                    }
                    return _extends({}, state, {
                        clientOffset: action.clientOffset
                    });
                case _dragDrop.END_DRAG:
                case _dragDrop.DROP:
                    return initialState;
                default:
                    return state;
            }
        }

        function getSourceClientOffset(state) {
            var clientOffset              = state.clientOffset,
                initialClientOffset       = state.initialClientOffset,
                initialSourceClientOffset = state.initialSourceClientOffset;

            if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
                return null;
            }
            return {
                x: clientOffset.x + initialSourceClientOffset.x - initialClientOffset.x,
                y: clientOffset.y + initialSourceClientOffset.y - initialClientOffset.y
            };
        }

        function getDifferenceFromInitialOffset(state) {
            var clientOffset        = state.clientOffset,
                initialClientOffset = state.initialClientOffset;

            if (!clientOffset || !initialClientOffset) {
                return null;
            }
            return {
                x: clientOffset.x - initialClientOffset.x,
                y: clientOffset.y - initialClientOffset.y
            };
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/reducers/dragOperation.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } }
                }
                return target;
            };

        exports.default = dragOperation;

        var _without = __webpack_require__("./node_modules/lodash/without.js");

        var _without2 = _interopRequireDefault(_without);

        var _dragDrop = __webpack_require__("./node_modules/dnd-core/lib/actions/dragDrop.js");

        var _registry = __webpack_require__("./node_modules/dnd-core/lib/actions/registry.js");

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        var initialState = {
            itemType: null,
            item: null,
            sourceId: null,
            targetIds: [],
            dropResult: null,
            didDrop: false,
            isSourcePublic: null
        };

        function dragOperation() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
            var action = arguments[1];

            switch (action.type) {
                case _dragDrop.BEGIN_DRAG:
                    return _extends({}, state, {
                        itemType: action.itemType,
                        item: action.item,
                        sourceId: action.sourceId,
                        isSourcePublic: action.isSourcePublic,
                        dropResult: null,
                        didDrop: false
                    });
                case _dragDrop.PUBLISH_DRAG_SOURCE:
                    return _extends({}, state, {
                        isSourcePublic: true
                    });
                case _dragDrop.HOVER:
                    return _extends({}, state, {
                        targetIds: action.targetIds
                    });
                case _registry.REMOVE_TARGET:
                    if (state.targetIds.indexOf(action.targetId) === -1) {
                        return state;
                    }
                    return _extends({}, state, {
                        targetIds: (0, _without2.default)(state.targetIds, action.targetId)
                    });
                case _dragDrop.DROP:
                    return _extends({}, state, {
                        dropResult: action.dropResult,
                        didDrop: true,
                        targetIds: []
                    });
                case _dragDrop.END_DRAG:
                    return _extends({}, state, {
                        itemType: null,
                        item: null,
                        sourceId: null,
                        dropResult: null,
                        didDrop: false,
                        isSourcePublic: null,
                        targetIds: []
                    });
                default:
                    return state;
            }
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/reducers/index.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = reduce;

        var _dragOffset = __webpack_require__("./node_modules/dnd-core/lib/reducers/dragOffset.js");

        var _dragOffset2 = _interopRequireDefault(_dragOffset);

        var _dragOperation = __webpack_require__("./node_modules/dnd-core/lib/reducers/dragOperation.js");

        var _dragOperation2 = _interopRequireDefault(_dragOperation);

        var _refCount = __webpack_require__("./node_modules/dnd-core/lib/reducers/refCount.js");

        var _refCount2 = _interopRequireDefault(_refCount);

        var _dirtyHandlerIds = __webpack_require__("./node_modules/dnd-core/lib/reducers/dirtyHandlerIds.js");

        var _dirtyHandlerIds2 = _interopRequireDefault(_dirtyHandlerIds);

        var _stateId = __webpack_require__("./node_modules/dnd-core/lib/reducers/stateId.js");

        var _stateId2 = _interopRequireDefault(_stateId);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function reduce() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var action = arguments[1];

            return {
                dirtyHandlerIds: (0, _dirtyHandlerIds2.default)(state.dirtyHandlerIds, action, state.dragOperation),
                dragOffset: (0, _dragOffset2.default)(state.dragOffset, action),
                refCount: (0, _refCount2.default)(state.refCount, action),
                dragOperation: (0, _dragOperation2.default)(state.dragOperation, action),
                stateId: (0, _stateId2.default)(state.stateId)
            };
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/reducers/refCount.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = refCount;

        var _registry = __webpack_require__("./node_modules/dnd-core/lib/actions/registry.js");

        function refCount() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var action = arguments[1];

            switch (action.type) {
                case _registry.ADD_SOURCE:
                case _registry.ADD_TARGET:
                    return state + 1;
                case _registry.REMOVE_SOURCE:
                case _registry.REMOVE_TARGET:
                    return state - 1;
                default:
                    return state;
            }
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/reducers/stateId.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = stateId;
        function stateId() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return state + 1;
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/utils/getNextUniqueId.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = getNextUniqueId;
        var nextUniqueId = 0;

        function getNextUniqueId() {
            return nextUniqueId++;
        }

        /***/
    }),

    /***/ "./node_modules/dnd-core/lib/utils/matchesType.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = matchesType;

        var _isArray = __webpack_require__("./node_modules/lodash/isArray.js");

        var _isArray2 = _interopRequireDefault(_isArray);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function matchesType(targetType, draggedItemType) {
            if ((0, _isArray2.default)(targetType)) {
                return targetType.some(function (t) {
                    return t === draggedItemType;
                });
            } else {
                return targetType === draggedItemType;
            }
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/BrowserDetector.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.isSafari = exports.isFirefox = undefined;

        var _memoize = __webpack_require__("./node_modules/lodash/memoize.js");

        var _memoize2 = _interopRequireDefault(_memoize);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        var isFirefox = exports.isFirefox = (0, _memoize2.default)(function () {
            return (/firefox/i.test(navigator.userAgent)
            );
        });
        var isSafari = exports.isSafari = (0, _memoize2.default)(function () {
            return Boolean(window.safari);
        });

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/EnterLeaveCounter.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _union = __webpack_require__("./node_modules/lodash/union.js");

        var _union2 = _interopRequireDefault(_union);

        var _without = __webpack_require__("./node_modules/lodash/without.js");

        var _without2 = _interopRequireDefault(_without);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var EnterLeaveCounter = function () {
            function EnterLeaveCounter() {
                _classCallCheck(this, EnterLeaveCounter);

                this.entered = [];
            }

            _createClass(EnterLeaveCounter, [{
                key: "enter",
                value: function enter(enteringNode) {
                    var previousLength = this.entered.length;

                    var isNodeEntered = function isNodeEntered(node) {
                        return document.documentElement.contains(node) && (!node.contains || node.contains(enteringNode));
                    };

                    this.entered = (0, _union2.default)(this.entered.filter(isNodeEntered), [enteringNode]);

                    return previousLength === 0 && this.entered.length > 0;
                }
            }, {
                key: "leave",
                value: function leave(leavingNode) {
                    var previousLength = this.entered.length;

                    this.entered = (0, _without2.default)(this.entered.filter(function (node) {
                        return document.documentElement.contains(node);
                    }), leavingNode);

                    return previousLength > 0 && this.entered.length === 0;
                }
            }, {
                key: "reset",
                value: function reset() {
                    this.entered = [];
                }
            }]);

            return EnterLeaveCounter;
        }();

        exports.default = EnterLeaveCounter;

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/HTML5Backend.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _defaults = __webpack_require__("./node_modules/lodash/defaults.js");

        var _defaults2 = _interopRequireDefault(_defaults);

        var _shallowEqual = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/shallowEqual.js");

        var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

        var _EnterLeaveCounter = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/EnterLeaveCounter.js");

        var _EnterLeaveCounter2 = _interopRequireDefault(_EnterLeaveCounter);

        var _BrowserDetector = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/BrowserDetector.js");

        var _OffsetUtils = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/OffsetUtils.js");

        var _NativeDragSources = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/NativeDragSources.js");

        var _NativeTypes = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/NativeTypes.js");

        var NativeTypes = _interopRequireWildcard(_NativeTypes);

        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) { return obj; } else {
                var newObj = {};
                if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
                newObj.default = obj;
                return newObj;
            }
        }

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var HTML5Backend = function () {
            function HTML5Backend(manager) {
                _classCallCheck(this, HTML5Backend);

                this.actions = manager.getActions();
                this.monitor = manager.getMonitor();
                this.registry = manager.getRegistry();
                this.context = manager.getContext();

                this.sourcePreviewNodes = {};
                this.sourcePreviewNodeOptions = {};
                this.sourceNodes = {};
                this.sourceNodeOptions = {};
                this.enterLeaveCounter = new _EnterLeaveCounter2.default();

                this.dragStartSourceIds = [];
                this.dropTargetIds = [];
                this.dragEnterTargetIds = [];
                this.currentNativeSource = null;
                this.currentNativeHandle = null;
                this.currentDragSourceNode = null;
                this.currentDragSourceNodeOffset = null;
                this.currentDragSourceNodeOffsetChanged = false;
                this.altKeyPressed = false;

                this.getSourceClientOffset = this.getSourceClientOffset.bind(this);
                this.handleTopDragStart = this.handleTopDragStart.bind(this);
                this.handleTopDragStartCapture = this.handleTopDragStartCapture.bind(this);
                this.handleTopDragEndCapture = this.handleTopDragEndCapture.bind(this);
                this.handleTopDragEnter = this.handleTopDragEnter.bind(this);
                this.handleTopDragEnterCapture = this.handleTopDragEnterCapture.bind(this);
                this.handleTopDragLeaveCapture = this.handleTopDragLeaveCapture.bind(this);
                this.handleTopDragOver = this.handleTopDragOver.bind(this);
                this.handleTopDragOverCapture = this.handleTopDragOverCapture.bind(this);
                this.handleTopDrop = this.handleTopDrop.bind(this);
                this.handleTopDropCapture = this.handleTopDropCapture.bind(this);
                this.handleSelectStart = this.handleSelectStart.bind(this);
                this.endDragIfSourceWasRemovedFromDOM = this.endDragIfSourceWasRemovedFromDOM.bind(this);
                this.endDragNativeItem = this.endDragNativeItem.bind(this);
                this.asyncEndDragNativeItem = this.asyncEndDragNativeItem.bind(this);
            }

            _createClass(HTML5Backend, [{
                key: "setup",
                value: function setup() {
                    if (this.window === undefined) {
                        return;
                    }

                    if (this.window.__isReactDndBackendSetUp) {
                        // eslint-disable-line no-underscore-dangle
                        throw new Error("Cannot have two HTML5 backends at the same time.");
                    }
                    this.window.__isReactDndBackendSetUp = true; // eslint-disable-line no-underscore-dangle
                    this.addEventListeners(this.window);
                }
            }, {
                key: "teardown",
                value: function teardown() {
                    if (this.window === undefined) {
                        return;
                    }

                    this.window.__isReactDndBackendSetUp = false; // eslint-disable-line no-underscore-dangle
                    this.removeEventListeners(this.window);
                    this.clearCurrentDragSourceNode();
                    if (this.asyncEndDragFrameId) {
                        this.window.cancelAnimationFrame(this.asyncEndDragFrameId);
                    }
                }
            }, {
                key: "addEventListeners",
                value: function addEventListeners(target) {
                    target.addEventListener("dragstart", this.handleTopDragStart);
                    target.addEventListener("dragstart", this.handleTopDragStartCapture, true);
                    target.addEventListener("dragend", this.handleTopDragEndCapture, true);
                    target.addEventListener("dragenter", this.handleTopDragEnter);
                    target.addEventListener("dragenter", this.handleTopDragEnterCapture, true);
                    target.addEventListener("dragleave", this.handleTopDragLeaveCapture, true);
                    target.addEventListener("dragover", this.handleTopDragOver);
                    target.addEventListener("dragover", this.handleTopDragOverCapture, true);
                    target.addEventListener("drop", this.handleTopDrop);
                    target.addEventListener("drop", this.handleTopDropCapture, true);
                }
            }, {
                key: "removeEventListeners",
                value: function removeEventListeners(target) {
                    target.removeEventListener("dragstart", this.handleTopDragStart);
                    target.removeEventListener("dragstart", this.handleTopDragStartCapture, true);
                    target.removeEventListener("dragend", this.handleTopDragEndCapture, true);
                    target.removeEventListener("dragenter", this.handleTopDragEnter);
                    target.removeEventListener("dragenter", this.handleTopDragEnterCapture, true);
                    target.removeEventListener("dragleave", this.handleTopDragLeaveCapture, true);
                    target.removeEventListener("dragover", this.handleTopDragOver);
                    target.removeEventListener("dragover", this.handleTopDragOverCapture, true);
                    target.removeEventListener("drop", this.handleTopDrop);
                    target.removeEventListener("drop", this.handleTopDropCapture, true);
                }
            }, {
                key: "connectDragPreview",
                value: function connectDragPreview(sourceId, node, options) {
                    var _this = this;

                    this.sourcePreviewNodeOptions[sourceId] = options;
                    this.sourcePreviewNodes[sourceId] = node;

                    return function () {
                        delete _this.sourcePreviewNodes[sourceId];
                        delete _this.sourcePreviewNodeOptions[sourceId];
                    };
                }
            }, {
                key: "connectDragSource",
                value: function connectDragSource(sourceId, node, options) {
                    var _this2 = this;

                    this.sourceNodes[sourceId] = node;
                    this.sourceNodeOptions[sourceId] = options;

                    var handleDragStart = function handleDragStart(e) {
                        return _this2.handleDragStart(e, sourceId);
                    };
                    var handleSelectStart = function handleSelectStart(e) {
                        return _this2.handleSelectStart(e, sourceId);
                    };

                    node.setAttribute("draggable", true);
                    node.addEventListener("dragstart", handleDragStart);
                    node.addEventListener("selectstart", handleSelectStart);

                    return function () {
                        delete _this2.sourceNodes[sourceId];
                        delete _this2.sourceNodeOptions[sourceId];

                        node.removeEventListener("dragstart", handleDragStart);
                        node.removeEventListener("selectstart", handleSelectStart);
                        node.setAttribute("draggable", false);
                    };
                }
            }, {
                key: "connectDropTarget",
                value: function connectDropTarget(targetId, node) {
                    var _this3 = this;

                    var handleDragEnter = function handleDragEnter(e) {
                        return _this3.handleDragEnter(e, targetId);
                    };
                    var handleDragOver = function handleDragOver(e) {
                        return _this3.handleDragOver(e, targetId);
                    };
                    var handleDrop = function handleDrop(e) {
                        return _this3.handleDrop(e, targetId);
                    };

                    node.addEventListener("dragenter", handleDragEnter);
                    node.addEventListener("dragover", handleDragOver);
                    node.addEventListener("drop", handleDrop);

                    return function () {
                        node.removeEventListener("dragenter", handleDragEnter);
                        node.removeEventListener("dragover", handleDragOver);
                        node.removeEventListener("drop", handleDrop);
                    };
                }
            }, {
                key: "getCurrentSourceNodeOptions",
                value: function getCurrentSourceNodeOptions() {
                    var sourceId = this.monitor.getSourceId();
                    var sourceNodeOptions = this.sourceNodeOptions[sourceId];

                    return (0, _defaults2.default)(sourceNodeOptions || {}, {
                        dropEffect: this.altKeyPressed ? "copy" : "move"
                    });
                }
            }, {
                key: "getCurrentDropEffect",
                value: function getCurrentDropEffect() {
                    if (this.isDraggingNativeItem()) {
                        // It makes more sense to default to 'copy' for native resources
                        return "copy";
                    }

                    return this.getCurrentSourceNodeOptions().dropEffect;
                }
            }, {
                key: "getCurrentSourcePreviewNodeOptions",
                value: function getCurrentSourcePreviewNodeOptions() {
                    var sourceId = this.monitor.getSourceId();
                    var sourcePreviewNodeOptions = this.sourcePreviewNodeOptions[sourceId];

                    return (0, _defaults2.default)(sourcePreviewNodeOptions || {}, {
                        anchorX: 0.5,
                        anchorY: 0.5,
                        captureDraggingState: false
                    });
                }
            }, {
                key: "getSourceClientOffset",
                value: function getSourceClientOffset(sourceId) {
                    return (0, _OffsetUtils.getNodeClientOffset)(this.sourceNodes[sourceId]);
                }
            }, {
                key: "isDraggingNativeItem",
                value: function isDraggingNativeItem() {
                    var itemType = this.monitor.getItemType();
                    return Object.keys(NativeTypes).some(function (key) {
                        return NativeTypes[key] === itemType;
                    });
                }
            }, {
                key: "beginDragNativeItem",
                value: function beginDragNativeItem(type) {
                    this.clearCurrentDragSourceNode();

                    var SourceType = (0, _NativeDragSources.createNativeDragSource)(type);
                    this.currentNativeSource = new SourceType();
                    this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
                    this.actions.beginDrag([this.currentNativeHandle]);

                    // On Firefox, if mouseover fires, the drag is over but browser failed to tell us.
                    // See https://bugzilla.mozilla.org/show_bug.cgi?id=656164
                    // This is not true for other browsers.
                    if ((0, _BrowserDetector.isFirefox)()) {
                        this.window.addEventListener("mouseover", this.asyncEndDragNativeItem, true);
                    }
                }
            }, {
                key: "asyncEndDragNativeItem",
                value: function asyncEndDragNativeItem() {
                    this.asyncEndDragFrameId = this.window.requestAnimationFrame(this.endDragNativeItem);
                    if ((0, _BrowserDetector.isFirefox)()) {
                        this.window.removeEventListener("mouseover", this.asyncEndDragNativeItem, true);
                        this.enterLeaveCounter.reset();
                    }
                }
            }, {
                key: "endDragNativeItem",
                value: function endDragNativeItem() {
                    if (!this.isDraggingNativeItem()) {
                        return;
                    }

                    this.actions.endDrag();
                    this.registry.removeSource(this.currentNativeHandle);
                    this.currentNativeHandle = null;
                    this.currentNativeSource = null;
                }
            }, {
                key: "endDragIfSourceWasRemovedFromDOM",
                value: function endDragIfSourceWasRemovedFromDOM() {
                    var node = this.currentDragSourceNode;
                    if (document.body.contains(node)) {
                        return;
                    }

                    if (this.clearCurrentDragSourceNode()) {
                        this.actions.endDrag();
                    }
                }
            }, {
                key: "setCurrentDragSourceNode",
                value: function setCurrentDragSourceNode(node) {
                    this.clearCurrentDragSourceNode();
                    this.currentDragSourceNode = node;
                    this.currentDragSourceNodeOffset = (0, _OffsetUtils.getNodeClientOffset)(node);
                    this.currentDragSourceNodeOffsetChanged = false;

                    // Receiving a mouse event in the middle of a dragging operation
                    // means it has ended and the drag source node disappeared from DOM,
                    // so the browser didn't dispatch the dragend event.
                    this.window.addEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
                }
            }, {
                key: "clearCurrentDragSourceNode",
                value: function clearCurrentDragSourceNode() {
                    if (this.currentDragSourceNode) {
                        this.currentDragSourceNode = null;
                        this.currentDragSourceNodeOffset = null;
                        this.currentDragSourceNodeOffsetChanged = false;
                        this.window.removeEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
                        return true;
                    }

                    return false;
                }
            }, {
                key: "checkIfCurrentDragSourceRectChanged",
                value: function checkIfCurrentDragSourceRectChanged() {
                    var node = this.currentDragSourceNode;
                    if (!node) {
                        return false;
                    }

                    if (this.currentDragSourceNodeOffsetChanged) {
                        return true;
                    }

                    this.currentDragSourceNodeOffsetChanged = !(0, _shallowEqual2.default)((0, _OffsetUtils.getNodeClientOffset)(node), this.currentDragSourceNodeOffset);

                    return this.currentDragSourceNodeOffsetChanged;
                }
            }, {
                key: "handleTopDragStartCapture",
                value: function handleTopDragStartCapture() {
                    this.clearCurrentDragSourceNode();
                    this.dragStartSourceIds = [];
                }
            }, {
                key: "handleDragStart",
                value: function handleDragStart(e, sourceId) {
                    this.dragStartSourceIds.unshift(sourceId);
                }
            }, {
                key: "handleTopDragStart",
                value: function handleTopDragStart(e) {
                    var _this4 = this;

                    var dragStartSourceIds = this.dragStartSourceIds;

                    this.dragStartSourceIds = null;

                    var clientOffset = (0, _OffsetUtils.getEventClientOffset)(e);

                    // Don't publish the source just yet (see why below)
                    this.actions.beginDrag(dragStartSourceIds, {
                        publishSource: false,
                        getSourceClientOffset: this.getSourceClientOffset,
                        clientOffset: clientOffset
                    });

                    var dataTransfer = e.dataTransfer;

                    var nativeType = (0, _NativeDragSources.matchNativeItemType)(dataTransfer);

                    if (this.monitor.isDragging()) {
                        if (typeof dataTransfer.setDragImage === "function") {
                            // Use custom drag image if user specifies it.
                            // If child drag source refuses drag but parent agrees,
                            // use parent's node as drag image. Neither works in IE though.
                            var sourceId = this.monitor.getSourceId();
                            var sourceNode = this.sourceNodes[sourceId];
                            var dragPreview = this.sourcePreviewNodes[sourceId] || sourceNode;

                            var _getCurrentSourcePrev = this.getCurrentSourcePreviewNodeOptions(),
                                anchorX               = _getCurrentSourcePrev.anchorX,
                                anchorY               = _getCurrentSourcePrev.anchorY;

                            var anchorPoint = {anchorX: anchorX, anchorY: anchorY};
                            var dragPreviewOffset = (0, _OffsetUtils.getDragPreviewOffset)(sourceNode, dragPreview, clientOffset, anchorPoint);
                            dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
                        }

                        try {
                            // Firefox won't drag without setting data
                            dataTransfer.setData("application/json", {});
                        } catch (err) {}
                        // IE doesn't support MIME types in setData


                        // Store drag source node so we can check whether
                        // it is removed from DOM and trigger endDrag manually.
                        this.setCurrentDragSourceNode(e.target);

                        // Now we are ready to publish the drag source.. or are we not?

                        var _getCurrentSourcePrev2 = this.getCurrentSourcePreviewNodeOptions(),
                            captureDraggingState   = _getCurrentSourcePrev2.captureDraggingState;

                        if (!captureDraggingState) {
                            // Usually we want to publish it in the next tick so that browser
                            // is able to screenshot the current (not yet dragging) state.
                            //
                            // It also neatly avoids a situation where render() returns null
                            // in the same tick for the source element, and browser freaks out.
                            setTimeout(function () {
                                return _this4.actions.publishDragSource();
                            });
                        } else {
                            // In some cases the user may want to override this behavior, e.g.
                            // to work around IE not supporting custom drag previews.
                            //
                            // When using a custom drag layer, the only way to prevent
                            // the default drag preview from drawing in IE is to screenshot
                            // the dragging state in which the node itself has zero opacity
                            // and height. In this case, though, returning null from render()
                            // will abruptly end the dragging, which is not obvious.
                            //
                            // This is the reason such behavior is strictly opt-in.
                            this.actions.publishDragSource();
                        }
                    } else if (nativeType) {
                        // A native item (such as URL) dragged from inside the document
                        this.beginDragNativeItem(nativeType);
                    } else if (!dataTransfer.types && (!e.target.hasAttribute || !e.target.hasAttribute("draggable"))) {
                        // Looks like a Safari bug: dataTransfer.types is null, but there was no draggable.
                        // Just let it drag. It's a native type (URL or text) and will be picked up in
                        // dragenter handler.
         // eslint-disable-line no-useless-return
                    } else {
                        // If by this time no drag source reacted, tell browser not to drag.
                        e.preventDefault();
                    }
                }
            }, {
                key: "handleTopDragEndCapture",
                value: function handleTopDragEndCapture() {
                    if (this.clearCurrentDragSourceNode()) {
                        // Firefox can dispatch this event in an infinite loop
                        // if dragend handler does something like showing an alert.
                        // Only proceed if we have not handled it already.
                        this.actions.endDrag();
                    }
                }
            }, {
                key: "handleTopDragEnterCapture",
                value: function handleTopDragEnterCapture(e) {
                    this.dragEnterTargetIds = [];

                    var isFirstEnter = this.enterLeaveCounter.enter(e.target);
                    if (!isFirstEnter || this.monitor.isDragging()) {
                        return;
                    }

                    var dataTransfer = e.dataTransfer;

                    var nativeType = (0, _NativeDragSources.matchNativeItemType)(dataTransfer);

                    if (nativeType) {
                        // A native item (such as file or URL) dragged from outside the document
                        this.beginDragNativeItem(nativeType);
                    }
                }
            }, {
                key: "handleDragEnter",
                value: function handleDragEnter(e, targetId) {
                    this.dragEnterTargetIds.unshift(targetId);
                }
            }, {
                key: "handleTopDragEnter",
                value: function handleTopDragEnter(e) {
                    var _this5 = this;

                    var dragEnterTargetIds = this.dragEnterTargetIds;

                    this.dragEnterTargetIds = [];

                    if (!this.monitor.isDragging()) {
                        // This is probably a native item type we don't understand.
                        return;
                    }

                    this.altKeyPressed = e.altKey;

                    if (!(0, _BrowserDetector.isFirefox)()) {
                        // Don't emit hover in `dragenter` on Firefox due to an edge case.
                        // If the target changes position as the result of `dragenter`, Firefox
                        // will still happily dispatch `dragover` despite target being no longer
                        // there. The easy solution is to only fire `hover` in `dragover` on FF.
                        this.actions.hover(dragEnterTargetIds, {
                            clientOffset: (0, _OffsetUtils.getEventClientOffset)(e)
                        });
                    }

                    var canDrop = dragEnterTargetIds.some(function (targetId) {
                        return _this5.monitor.canDropOnTarget(targetId);
                    });

                    if (canDrop) {
                        // IE requires this to fire dragover events
                        e.preventDefault();
                        e.dataTransfer.dropEffect = this.getCurrentDropEffect();
                    }
                }
            }, {
                key: "handleTopDragOverCapture",
                value: function handleTopDragOverCapture() {
                    this.dragOverTargetIds = [];
                }
            }, {
                key: "handleDragOver",
                value: function handleDragOver(e, targetId) {
                    this.dragOverTargetIds.unshift(targetId);
                }
            }, {
                key: "handleTopDragOver",
                value: function handleTopDragOver(e) {
                    var _this6 = this;

                    var dragOverTargetIds = this.dragOverTargetIds;

                    this.dragOverTargetIds = [];

                    if (!this.monitor.isDragging()) {
                        // This is probably a native item type we don't understand.
                        // Prevent default "drop and blow away the whole document" action.
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "none";
                        return;
                    }

                    this.altKeyPressed = e.altKey;

                    this.actions.hover(dragOverTargetIds, {
                        clientOffset: (0, _OffsetUtils.getEventClientOffset)(e)
                    });

                    var canDrop = dragOverTargetIds.some(function (targetId) {
                        return _this6.monitor.canDropOnTarget(targetId);
                    });

                    if (canDrop) {
                        // Show user-specified drop effect.
                        e.preventDefault();
                        e.dataTransfer.dropEffect = this.getCurrentDropEffect();
                    } else if (this.isDraggingNativeItem()) {
                        // Don't show a nice cursor but still prevent default
                        // "drop and blow away the whole document" action.
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "none";
                    } else if (this.checkIfCurrentDragSourceRectChanged()) {
                        // Prevent animating to incorrect position.
                        // Drop effect must be other than 'none' to prevent animation.
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                    }
                }
            }, {
                key: "handleTopDragLeaveCapture",
                value: function handleTopDragLeaveCapture(e) {
                    if (this.isDraggingNativeItem()) {
                        e.preventDefault();
                    }

                    var isLastLeave = this.enterLeaveCounter.leave(e.target);
                    if (!isLastLeave) {
                        return;
                    }

                    if (this.isDraggingNativeItem()) {
                        this.endDragNativeItem();
                    }
                }
            }, {
                key: "handleTopDropCapture",
                value: function handleTopDropCapture(e) {
                    this.dropTargetIds = [];
                    e.preventDefault();

                    if (this.isDraggingNativeItem()) {
                        this.currentNativeSource.mutateItemByReadingDataTransfer(e.dataTransfer);
                    }

                    this.enterLeaveCounter.reset();
                }
            }, {
                key: "handleDrop",
                value: function handleDrop(e, targetId) {
                    this.dropTargetIds.unshift(targetId);
                }
            }, {
                key: "handleTopDrop",
                value: function handleTopDrop(e) {
                    var dropTargetIds = this.dropTargetIds;

                    this.dropTargetIds = [];

                    this.actions.hover(dropTargetIds, {
                        clientOffset: (0, _OffsetUtils.getEventClientOffset)(e)
                    });
                    this.actions.drop({dropEffect: this.getCurrentDropEffect()});

                    if (this.isDraggingNativeItem()) {
                        this.endDragNativeItem();
                    } else {
                        this.endDragIfSourceWasRemovedFromDOM();
                    }
                }
            }, {
                key: "handleSelectStart",
                value: function handleSelectStart(e) {
                    var target = e.target;

                    // Only IE requires us to explicitly say
                    // we want drag drop operation to start

                    if (typeof target.dragDrop !== "function") {
                        return;
                    }

                    // Inputs and textareas should be selectable
                    if (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
                        return;
                    }

                    // For other targets, ask IE
                    // to enable drag and drop
                    e.preventDefault();
                    target.dragDrop();
                }
            }, {
                key: "window",
                get: function get() {
                    if (this.context && this.context.window) {
                        return this.context.window;
                    } else if (typeof window !== "undefined") {
                        return window;
                    }
                    return undefined;
                }
            }]);

            return HTML5Backend;
        }();

        exports.default = HTML5Backend;

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/MonotonicInterpolant.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        /* eslint
         no-plusplus: off,
         no-mixed-operators: off
         */
        var MonotonicInterpolant = function () {
            function MonotonicInterpolant(xs, ys) {
                _classCallCheck(this, MonotonicInterpolant);

                var length = xs.length;

                // Rearrange xs and ys so that xs is sorted
                var indexes = [];
                for (var i = 0; i < length; i++) {
                    indexes.push(i);
                }
                indexes.sort(function (a, b) {
                    return xs[a] < xs[b] ? -1 : 1;
                });

                // Get consecutive differences and slopes
                var dys = [];
                var dxs = [];
                var ms = [];
                var dx = void 0;
                var dy = void 0;
                for (var _i = 0; _i < length - 1; _i++) {
                    dx = xs[_i + 1] - xs[_i];
                    dy = ys[_i + 1] - ys[_i];
                    dxs.push(dx);
                    dys.push(dy);
                    ms.push(dy / dx);
                }

                // Get degree-1 coefficients
                var c1s = [ms[0]];
                for (var _i2 = 0; _i2 < dxs.length - 1; _i2++) {
                    var _m = ms[_i2];
                    var mNext = ms[_i2 + 1];
                    if (_m * mNext <= 0) {
                        c1s.push(0);
                    } else {
                        dx = dxs[_i2];
                        var dxNext = dxs[_i2 + 1];
                        var common = dx + dxNext;
                        c1s.push(3 * common / ((common + dxNext) / _m + (common + dx) / mNext));
                    }
                }
                c1s.push(ms[ms.length - 1]);

                // Get degree-2 and degree-3 coefficients
                var c2s = [];
                var c3s = [];
                var m = void 0;
                for (var _i3 = 0; _i3 < c1s.length - 1; _i3++) {
                    m = ms[_i3];
                    var c1 = c1s[_i3];
                    var invDx = 1 / dxs[_i3];
                    var _common = c1 + c1s[_i3 + 1] - m - m;
                    c2s.push((m - c1 - _common) * invDx);
                    c3s.push(_common * invDx * invDx);
                }

                this.xs = xs;
                this.ys = ys;
                this.c1s = c1s;
                this.c2s = c2s;
                this.c3s = c3s;
            }

            _createClass(MonotonicInterpolant, [{
                key: "interpolate",
                value: function interpolate(x) {
                    var xs  = this.xs,
                        ys  = this.ys,
                        c1s = this.c1s,
                        c2s = this.c2s,
                        c3s = this.c3s;

                    // The rightmost point in the dataset should give an exact result

                    var i = xs.length - 1;
                    if (x === xs[i]) {
                        return ys[i];
                    }

                    // Search for the interval x is in, returning the corresponding y if x is one of the original xs
                    var low = 0;
                    var high = c3s.length - 1;
                    var mid = void 0;
                    while (low <= high) {
                        mid = Math.floor(0.5 * (low + high));
                        var xHere = xs[mid];
                        if (xHere < x) {
                            low = mid + 1;
                        } else if (xHere > x) {
                            high = mid - 1;
                        } else {
                            return ys[mid];
                        }
                    }
                    i = Math.max(0, high);

                    // Interpolate
                    var diff = x - xs[i];
                    var diffSq = diff * diff;
                    return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
                }
            }]);

            return MonotonicInterpolant;
        }();

        exports.default = MonotonicInterpolant;

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/NativeDragSources.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _nativeTypesConfig;

        exports.createNativeDragSource = createNativeDragSource;
        exports.matchNativeItemType = matchNativeItemType;

        var _NativeTypes = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/NativeTypes.js");

        var NativeTypes = _interopRequireWildcard(_NativeTypes);

        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) { return obj; } else {
                var newObj = {};
                if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
                newObj.default = obj;
                return newObj;
            }
        }

        function _defineEnumerableProperties(obj, descs) {
            for (var key in descs) {
                var desc = descs[key];
                desc.configurable = desc.enumerable = true;
                if ("value" in desc) desc.writable = true;
                Object.defineProperty(obj, key, desc);
            }
            return obj;
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        function _defineProperty(obj, key, value) {
            if (key in obj) { Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true}); } else { obj[key] = value; }
            return obj;
        }

        function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
            var result = typesToTry.reduce(function (resultSoFar, typeToTry) {
                return resultSoFar || dataTransfer.getData(typeToTry);
            }, null);

            return result != null ? // eslint-disable-line eqeqeq
                result : defaultValue;
        }

        var nativeTypesConfig = (_nativeTypesConfig = {}, _defineProperty(_nativeTypesConfig, NativeTypes.FILE, {
            exposeProperty: "files",
            matchesTypes: ["Files"],
            getData: function getData(dataTransfer) {
                return Array.prototype.slice.call(dataTransfer.files);
            }
        }), _defineProperty(_nativeTypesConfig, NativeTypes.URL, {
            exposeProperty: "urls",
            matchesTypes: ["Url", "text/uri-list"],
            getData: function getData(dataTransfer, matchesTypes) {
                return getDataFromDataTransfer(dataTransfer, matchesTypes, "").split("\n");
            }
        }), _defineProperty(_nativeTypesConfig, NativeTypes.TEXT, {
            exposeProperty: "text",
            matchesTypes: ["Text", "text/plain"],
            getData: function getData(dataTransfer, matchesTypes) {
                return getDataFromDataTransfer(dataTransfer, matchesTypes, "");
            }
        }), _nativeTypesConfig);

        function createNativeDragSource(type) {
            var _nativeTypesConfig$ty = nativeTypesConfig[type],
                exposeProperty        = _nativeTypesConfig$ty.exposeProperty,
                matchesTypes          = _nativeTypesConfig$ty.matchesTypes,
                getData               = _nativeTypesConfig$ty.getData;


            return function () {
                function NativeDragSource() {
                    var _item, _mutatorMap;

                    _classCallCheck(this, NativeDragSource);

                    this.item = (_item = {}, _mutatorMap = {}, _mutatorMap[exposeProperty] = _mutatorMap[exposeProperty] || {}, _mutatorMap[exposeProperty].get = function () {
                        console.warn( // eslint-disable-line no-console
                            "Browser doesn't allow reading \"" + exposeProperty + "\" until the drop event.");
                        return null;
                    }, _defineEnumerableProperties(_item, _mutatorMap), _item);
                }

                _createClass(NativeDragSource, [{
                    key: "mutateItemByReadingDataTransfer",
                    value: function mutateItemByReadingDataTransfer(dataTransfer) {
                        delete this.item[exposeProperty];
                        this.item[exposeProperty] = getData(dataTransfer, matchesTypes);
                    }
                }, {
                    key: "canDrag",
                    value: function canDrag() {
                        return true;
                    }
                }, {
                    key: "beginDrag",
                    value: function beginDrag() {
                        return this.item;
                    }
                }, {
                    key: "isDragging",
                    value: function isDragging(monitor, handle) {
                        return handle === monitor.getSourceId();
                    }
                }, {
                    key: "endDrag",
                    value: function endDrag() {
                    }
                }]);

                return NativeDragSource;
            }();
        }

        function matchNativeItemType(dataTransfer) {
            var dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);

            return Object.keys(nativeTypesConfig).filter(function (nativeItemType) {
                    var matchesTypes = nativeTypesConfig[nativeItemType].matchesTypes;

                    return matchesTypes.some(function (t) {
                        return dataTransferTypes.indexOf(t) > -1;
                    });
                })[0] || null;
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/NativeTypes.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var FILE = exports.FILE = "__NATIVE_FILE__";
        var URL = exports.URL = "__NATIVE_URL__";
        var TEXT = exports.TEXT = "__NATIVE_TEXT__";

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/OffsetUtils.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getNodeClientOffset = getNodeClientOffset;
        exports.getEventClientOffset = getEventClientOffset;
        exports.getDragPreviewOffset = getDragPreviewOffset;

        var _BrowserDetector = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/BrowserDetector.js");

        var _MonotonicInterpolant = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/MonotonicInterpolant.js");

        var _MonotonicInterpolant2 = _interopRequireDefault(_MonotonicInterpolant);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        /* eslint
         no-mixed-operators: off
         */
        var ELEMENT_NODE = 1;

        function getNodeClientOffset(node) {
            var el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;

            if (!el) {
                return null;
            }

            var _el$getBoundingClient = el.getBoundingClientRect(),
                top                   = _el$getBoundingClient.top,
                left                  = _el$getBoundingClient.left;

            return {x: left, y: top};
        }

        function getEventClientOffset(e) {
            return {
                x: e.clientX,
                y: e.clientY
            };
        }

        function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint) {
            // The browsers will use the image intrinsic size under different conditions.
            // Firefox only cares if it's an image, but WebKit also wants it to be detached.
            var isImage = dragPreview.nodeName === "IMG" && ((0, _BrowserDetector.isFirefox)() || !document.documentElement.contains(dragPreview));
            var dragPreviewNode = isImage ? sourceNode : dragPreview;

            var dragPreviewNodeOffsetFromClient = getNodeClientOffset(dragPreviewNode);
            var offsetFromDragPreview = {
                x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
                y: clientOffset.y - dragPreviewNodeOffsetFromClient.y
            };

            var sourceWidth  = sourceNode.offsetWidth,
                sourceHeight = sourceNode.offsetHeight;
            var anchorX = anchorPoint.anchorX,
                anchorY = anchorPoint.anchorY;


            var dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
            var dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;

            // Work around @2x coordinate discrepancies in browsers
            if ((0, _BrowserDetector.isSafari)() && isImage) {
                dragPreviewHeight /= window.devicePixelRatio;
                dragPreviewWidth /= window.devicePixelRatio;
            }

            // Interpolate coordinates depending on anchor point
            // If you know a simpler way to do this, let me know
            var interpolantX = new _MonotonicInterpolant2.default([0, 0.5, 1], [
                // Dock to the left
                offsetFromDragPreview.x,
                // Align at the center
                offsetFromDragPreview.x / sourceWidth * dragPreviewWidth,
                // Dock to the right
                offsetFromDragPreview.x + dragPreviewWidth - sourceWidth]);
            var interpolantY = new _MonotonicInterpolant2.default([0, 0.5, 1], [
                // Dock to the top
                offsetFromDragPreview.y,
                // Align at the center
                offsetFromDragPreview.y / sourceHeight * dragPreviewHeight,
                // Dock to the bottom
                offsetFromDragPreview.y + dragPreviewHeight - sourceHeight]);
            var x = interpolantX.interpolate(anchorX);
            var y = interpolantY.interpolate(anchorY);

            // Work around Safari 8 positioning bug
            if ((0, _BrowserDetector.isSafari)() && isImage) {
                // We'll have to wait for @3x to see if this is entirely correct
                y += (window.devicePixelRatio - 1) * dragPreviewHeight;
            }

            return {x: x, y: y};
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/getEmptyImage.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = getEmptyImage;
        var emptyImage = void 0;

        function getEmptyImage() {
            if (!emptyImage) {
                emptyImage = new Image();
                emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            }

            return emptyImage;
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/index.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getEmptyImage = exports.NativeTypes = undefined;
        exports.default = createHTML5Backend;

        var _HTML5Backend = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/HTML5Backend.js");

        var _HTML5Backend2 = _interopRequireDefault(_HTML5Backend);

        var _getEmptyImage = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/getEmptyImage.js");

        var _getEmptyImage2 = _interopRequireDefault(_getEmptyImage);

        var _NativeTypes = __webpack_require__("./node_modules/react-dnd-html5-backend/lib/NativeTypes.js");

        var NativeTypes = _interopRequireWildcard(_NativeTypes);

        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) { return obj; } else {
                var newObj = {};
                if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } }
                newObj.default = obj;
                return newObj;
            }
        }

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        exports.NativeTypes = NativeTypes;
        exports.getEmptyImage = _getEmptyImage2.default;
        function createHTML5Backend(manager) {
            return new _HTML5Backend2.default(manager);
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd-html5-backend/lib/shallowEqual.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = shallowEqual;
        function shallowEqual(objA, objB) {
            if (objA === objB) {
                return true;
            }

            var keysA = Object.keys(objA);
            var keysB = Object.keys(objB);

            if (keysA.length !== keysB.length) {
                return false;
            }

            // Test for A's keys different from B.
            var hasOwn = Object.prototype.hasOwnProperty;
            for (var i = 0; i < keysA.length; i += 1) {
                if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                    return false;
                }

                var valA = objA[keysA[i]];
                var valB = objB[keysA[i]];

                if (valA !== valB) {
                    return false;
                }
            }

            return true;
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/DragDropContext.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.unpackBackendForEs5Users = exports.createChildContext = exports.CHILD_CONTEXT_TYPES = undefined;

        var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } }
                }
                return target;
            };

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        exports.default = DragDropContext;

        var _react = __webpack_require__(0);

        var _react2 = _interopRequireDefault(_react);

        var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

        var _propTypes2 = _interopRequireDefault(_propTypes);

        var _dndCore = __webpack_require__("./node_modules/dnd-core/lib/index.js");

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _hoistNonReactStatics = __webpack_require__("./node_modules/react-dnd/node_modules/hoist-non-react-statics/index.js");

        var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

        var _checkDecoratorArguments = __webpack_require__("./node_modules/react-dnd/lib/utils/checkDecoratorArguments.js");

        var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); }
            subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: false, writable: true, configurable: true}});
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var CHILD_CONTEXT_TYPES = exports.CHILD_CONTEXT_TYPES = {
            dragDropManager: _propTypes2.default.object.isRequired
        };

        var createChildContext = exports.createChildContext = function createChildContext(backend, context) {
            return {
                dragDropManager: new _dndCore.DragDropManager(backend, context)
            };
        };

        var unpackBackendForEs5Users = exports.unpackBackendForEs5Users = function unpackBackendForEs5Users(backendOrModule) {
            // Auto-detect ES6 default export for people still using ES5
            var backend = backendOrModule;
            if ((typeof backend === "undefined" ? "undefined" : _typeof(backend)) === "object" && typeof backend.default === "function") {
                backend = backend.default;
            }
            (0, _invariant2.default)(typeof backend === "function", "Expected the backend to be a function or an ES6 module exporting a default function. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html");
            return backend;
        };

        function DragDropContext(backendOrModule) {
            _checkDecoratorArguments2.default.apply(undefined, ["DragDropContext", "backend"].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params

            var backend = unpackBackendForEs5Users(backendOrModule);
            var childContext = createChildContext(backend);

            return function decorateContext(DecoratedComponent) {
                var _class, _temp;

                var displayName = DecoratedComponent.displayName || DecoratedComponent.name || "Component";

                var DragDropContextContainer = (_temp = _class = function (_Component) {
                    _inherits(DragDropContextContainer, _Component);

                    function DragDropContextContainer() {
                        _classCallCheck(this, DragDropContextContainer);

                        return _possibleConstructorReturn(this, (DragDropContextContainer.__proto__ || Object.getPrototypeOf(DragDropContextContainer)).apply(this, arguments));
                    }

                    _createClass(DragDropContextContainer, [{
                        key: "getDecoratedComponentInstance",
                        value: function getDecoratedComponentInstance() {
                            (0, _invariant2.default)(this.child, "In order to access an instance of the decorated component it can " + "not be a stateless component.");
                            return this.child;
                        }
                    }, {
                        key: "getManager",
                        value: function getManager() {
                            return childContext.dragDropManager;
                        }
                    }, {
                        key: "getChildContext",
                        value: function getChildContext() {
                            return childContext;
                        }
                    }, {
                        key: "render",
                        value: function render() {
                            var _this2 = this;

                            return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, {
                                ref: function ref(child) {
                                    return _this2.child = child;
                                }
                            }));
                        }
                    }]);

                    return DragDropContextContainer;
                }(_react.Component), _class.DecoratedComponent = DecoratedComponent, _class.displayName = "DragDropContext(" + displayName + ")", _class.childContextTypes = CHILD_CONTEXT_TYPES, _temp);


                return (0, _hoistNonReactStatics2.default)(DragDropContextContainer, DecoratedComponent);
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/DragDropContextProvider.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = undefined;

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _class, _temp;

        var _react = __webpack_require__(0);

        var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

        var _propTypes2 = _interopRequireDefault(_propTypes);

        var _DragDropContext = __webpack_require__("./node_modules/react-dnd/lib/DragDropContext.js");

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); }
            subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: false, writable: true, configurable: true}});
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        /**
         * This class is a React-Component based version of the DragDropContext.
         * This is an alternative to decorating an application component with an ES7 decorator.
         */
        var DragDropContextProvider = (_temp = _class = function (_Component) {
            _inherits(DragDropContextProvider, _Component);

            function DragDropContextProvider(props, context) {
                _classCallCheck(this, DragDropContextProvider);

                var _this = _possibleConstructorReturn(this, (DragDropContextProvider.__proto__ || Object.getPrototypeOf(DragDropContextProvider)).call(this, props, context));

                _this.backend = (0, _DragDropContext.unpackBackendForEs5Users)(props.backend);
                return _this;
            }

            _createClass(DragDropContextProvider, [{
                key: "getChildContext",
                value: function getChildContext() {
                    var _this2 = this;

                    /**
                     * This property determines which window global to use for creating the DragDropManager.
                     * If a window has been injected explicitly via props, that is used first. If it is available
                     * as a context value, then use that, otherwise use the browser global.
                     */
                    var getWindow = function getWindow() {
                        if (_this2.props && _this2.props.window) {
                            return _this2.props.window;
                        } else if (_this2.context && _this2.context.window) {
                            return _this2.context.window;
                        } else if (typeof window !== "undefined") {
                            return window;
                        }
                        return undefined;
                    };

                    return (0, _DragDropContext.createChildContext)(this.backend, {window: getWindow()});
                }
            }, {
                key: "render",
                value: function render() {
                    return _react.Children.only(this.props.children);
                }
            }]);

            return DragDropContextProvider;
        }(_react.Component), _class.propTypes = {
            backend: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]).isRequired,
            children: _propTypes2.default.element.isRequired,
            window: _propTypes2.default.object
        }, _class.defaultProps = {
            window: undefined
        }, _class.childContextTypes = _DragDropContext.CHILD_CONTEXT_TYPES, _class.displayName = "DragDropContextProvider", _class.contextTypes = {
            window: _propTypes2.default.object
        }, _temp);
        exports.default = DragDropContextProvider;

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/DragLayer.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } }
                }
                return target;
            };

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        exports.default = DragLayer;

        var _react = __webpack_require__(0);

        var _react2 = _interopRequireDefault(_react);

        var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

        var _propTypes2 = _interopRequireDefault(_propTypes);

        var _hoistNonReactStatics = __webpack_require__("./node_modules/react-dnd/node_modules/hoist-non-react-statics/index.js");

        var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

        var _isPlainObject = __webpack_require__("./node_modules/lodash/isPlainObject.js");

        var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _shallowEqual = __webpack_require__("./node_modules/react-dnd/lib/utils/shallowEqual.js");

        var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

        var _shallowEqualScalar = __webpack_require__("./node_modules/react-dnd/lib/utils/shallowEqualScalar.js");

        var _shallowEqualScalar2 = _interopRequireDefault(_shallowEqualScalar);

        var _checkDecoratorArguments = __webpack_require__("./node_modules/react-dnd/lib/utils/checkDecoratorArguments.js");

        var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); }
            subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: false, writable: true, configurable: true}});
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        function DragLayer(collect) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            _checkDecoratorArguments2.default.apply(undefined, ["DragLayer", "collect[, options]"].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params
            (0, _invariant2.default)(typeof collect === "function", "Expected \"collect\" provided as the first argument to DragLayer " + "to be a function that collects props to inject into the component. ", "Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html", collect);
            (0, _invariant2.default)((0, _isPlainObject2.default)(options), "Expected \"options\" provided as the second argument to DragLayer to be " + "a plain object when specified. " + "Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html", options);

            return function decorateLayer(DecoratedComponent) {
                var _class, _temp;

                var _options$arePropsEqua = options.arePropsEqual,
                    arePropsEqual         = _options$arePropsEqua === undefined ? _shallowEqualScalar2.default : _options$arePropsEqua;

                var displayName = DecoratedComponent.displayName || DecoratedComponent.name || "Component";

                var DragLayerContainer = (_temp = _class = function (_Component) {
                    _inherits(DragLayerContainer, _Component);

                    _createClass(DragLayerContainer, [{
                        key: "getDecoratedComponentInstance",
                        value: function getDecoratedComponentInstance() {
                            (0, _invariant2.default)(this.child, "In order to access an instance of the decorated component it can " + "not be a stateless component.");
                            return this.child;
                        }
                    }, {
                        key: "shouldComponentUpdate",
                        value: function shouldComponentUpdate(nextProps, nextState) {
                            return !arePropsEqual(nextProps, this.props) || !(0, _shallowEqual2.default)(nextState, this.state);
                        }
                    }]);

                    function DragLayerContainer(props, context) {
                        _classCallCheck(this, DragLayerContainer);

                        var _this = _possibleConstructorReturn(this, (DragLayerContainer.__proto__ || Object.getPrototypeOf(DragLayerContainer)).call(this, props));

                        _this.handleChange = _this.handleChange.bind(_this);

                        _this.manager = context.dragDropManager;
                        (0, _invariant2.default)(_typeof(_this.manager) === "object", "Could not find the drag and drop manager in the context of %s. " + "Make sure to wrap the top-level component of your app with DragDropContext. " + "Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context", displayName, displayName);

                        _this.state = _this.getCurrentState();
                        return _this;
                    }

                    _createClass(DragLayerContainer, [{
                        key: "componentDidMount",
                        value: function componentDidMount() {
                            this.isCurrentlyMounted = true;

                            var monitor = this.manager.getMonitor();
                            this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);
                            this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);

                            this.handleChange();
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function componentWillUnmount() {
                            this.isCurrentlyMounted = false;

                            this.unsubscribeFromOffsetChange();
                            this.unsubscribeFromStateChange();
                        }
                    }, {
                        key: "handleChange",
                        value: function handleChange() {
                            if (!this.isCurrentlyMounted) {
                                return;
                            }

                            var nextState = this.getCurrentState();
                            if (!(0, _shallowEqual2.default)(nextState, this.state)) {
                                this.setState(nextState);
                            }
                        }
                    }, {
                        key: "getCurrentState",
                        value: function getCurrentState() {
                            var monitor = this.manager.getMonitor();
                            return collect(monitor);
                        }
                    }, {
                        key: "render",
                        value: function render() {
                            var _this2 = this;

                            return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, this.state, {
                                ref: function ref(child) {
                                    return _this2.child = child;
                                }
                            }));
                        }
                    }]);

                    return DragLayerContainer;
                }(_react.Component), _class.DecoratedComponent = DecoratedComponent, _class.displayName = "DragLayer(" + displayName + ")", _class.contextTypes = {
                    dragDropManager: _propTypes2.default.object.isRequired
                }, _temp);


                return (0, _hoistNonReactStatics2.default)(DragLayerContainer, DecoratedComponent);
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/DragSource.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = DragSource;

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _isPlainObject = __webpack_require__("./node_modules/lodash/isPlainObject.js");

        var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

        var _checkDecoratorArguments = __webpack_require__("./node_modules/react-dnd/lib/utils/checkDecoratorArguments.js");

        var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

        var _decorateHandler = __webpack_require__("./node_modules/react-dnd/lib/decorateHandler.js");

        var _decorateHandler2 = _interopRequireDefault(_decorateHandler);

        var _registerSource = __webpack_require__("./node_modules/react-dnd/lib/registerSource.js");

        var _registerSource2 = _interopRequireDefault(_registerSource);

        var _createSourceFactory = __webpack_require__("./node_modules/react-dnd/lib/createSourceFactory.js");

        var _createSourceFactory2 = _interopRequireDefault(_createSourceFactory);

        var _createSourceMonitor = __webpack_require__("./node_modules/react-dnd/lib/createSourceMonitor.js");

        var _createSourceMonitor2 = _interopRequireDefault(_createSourceMonitor);

        var _createSourceConnector = __webpack_require__("./node_modules/react-dnd/lib/createSourceConnector.js");

        var _createSourceConnector2 = _interopRequireDefault(_createSourceConnector);

        var _isValidType = __webpack_require__("./node_modules/react-dnd/lib/utils/isValidType.js");

        var _isValidType2 = _interopRequireDefault(_isValidType);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function DragSource(type, spec, collect) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            _checkDecoratorArguments2.default.apply(undefined, ["DragSource", "type, spec, collect[, options]"].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params
            var getType = type;
            if (typeof type !== "function") {
                (0, _invariant2.default)((0, _isValidType2.default)(type), "Expected \"type\" provided as the first argument to DragSource to be " + "a string, or a function that returns a string given the current props. " + "Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html", type);
                getType = function getType() {
                    return type;
                };
            }
            (0, _invariant2.default)((0, _isPlainObject2.default)(spec), "Expected \"spec\" provided as the second argument to DragSource to be " + "a plain object. Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html", spec);
            var createSource = (0, _createSourceFactory2.default)(spec);
            (0, _invariant2.default)(typeof collect === "function", "Expected \"collect\" provided as the third argument to DragSource to be " + "a function that returns a plain object of props to inject. " + "Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html", collect);
            (0, _invariant2.default)((0, _isPlainObject2.default)(options), "Expected \"options\" provided as the fourth argument to DragSource to be " + "a plain object when specified. " + "Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html", collect);

            return function decorateSource(DecoratedComponent) {
                return (0, _decorateHandler2.default)({
                    connectBackend: function connectBackend(backend, sourceId) {
                        return backend.connectDragSource(sourceId);
                    },
                    containerDisplayName: "DragSource",
                    createHandler: createSource,
                    registerHandler: _registerSource2.default,
                    createMonitor: _createSourceMonitor2.default,
                    createConnector: _createSourceConnector2.default,
                    DecoratedComponent: DecoratedComponent,
                    getType: getType,
                    collect: collect,
                    options: options
                });
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/DropTarget.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = DropTarget;

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _isPlainObject = __webpack_require__("./node_modules/lodash/isPlainObject.js");

        var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

        var _checkDecoratorArguments = __webpack_require__("./node_modules/react-dnd/lib/utils/checkDecoratorArguments.js");

        var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

        var _decorateHandler = __webpack_require__("./node_modules/react-dnd/lib/decorateHandler.js");

        var _decorateHandler2 = _interopRequireDefault(_decorateHandler);

        var _registerTarget = __webpack_require__("./node_modules/react-dnd/lib/registerTarget.js");

        var _registerTarget2 = _interopRequireDefault(_registerTarget);

        var _createTargetFactory = __webpack_require__("./node_modules/react-dnd/lib/createTargetFactory.js");

        var _createTargetFactory2 = _interopRequireDefault(_createTargetFactory);

        var _createTargetMonitor = __webpack_require__("./node_modules/react-dnd/lib/createTargetMonitor.js");

        var _createTargetMonitor2 = _interopRequireDefault(_createTargetMonitor);

        var _createTargetConnector = __webpack_require__("./node_modules/react-dnd/lib/createTargetConnector.js");

        var _createTargetConnector2 = _interopRequireDefault(_createTargetConnector);

        var _isValidType = __webpack_require__("./node_modules/react-dnd/lib/utils/isValidType.js");

        var _isValidType2 = _interopRequireDefault(_isValidType);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function DropTarget(type, spec, collect) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            _checkDecoratorArguments2.default.apply(undefined, ["DropTarget", "type, spec, collect[, options]"].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params
            var getType = type;
            if (typeof type !== "function") {
                (0, _invariant2.default)((0, _isValidType2.default)(type, true), "Expected \"type\" provided as the first argument to DropTarget to be " + "a string, an array of strings, or a function that returns either given " + "the current props. Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html", type);
                getType = function getType() {
                    return type;
                };
            }
            (0, _invariant2.default)((0, _isPlainObject2.default)(spec), "Expected \"spec\" provided as the second argument to DropTarget to be " + "a plain object. Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html", spec);
            var createTarget = (0, _createTargetFactory2.default)(spec);
            (0, _invariant2.default)(typeof collect === "function", "Expected \"collect\" provided as the third argument to DropTarget to be " + "a function that returns a plain object of props to inject. " + "Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html", collect);
            (0, _invariant2.default)((0, _isPlainObject2.default)(options), "Expected \"options\" provided as the fourth argument to DropTarget to be " + "a plain object when specified. " + "Instead, received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html", collect);

            return function decorateTarget(DecoratedComponent) {
                return (0, _decorateHandler2.default)({
                    connectBackend: function connectBackend(backend, targetId) {
                        return backend.connectDropTarget(targetId);
                    },
                    containerDisplayName: "DropTarget",
                    createHandler: createTarget,
                    registerHandler: _registerTarget2.default,
                    createMonitor: _createTargetMonitor2.default,
                    createConnector: _createTargetConnector2.default,
                    DecoratedComponent: DecoratedComponent,
                    getType: getType,
                    collect: collect,
                    options: options
                });
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/areOptionsEqual.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = areOptionsEqual;

        var _shallowEqual = __webpack_require__("./node_modules/react-dnd/lib/utils/shallowEqual.js");

        var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function areOptionsEqual(nextOptions, currentOptions) {
            if (currentOptions === nextOptions) {
                return true;
            }

            return currentOptions !== null && nextOptions !== null && (0, _shallowEqual2.default)(currentOptions, nextOptions);
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/createSourceConnector.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = createSourceConnector;

        var _wrapConnectorHooks = __webpack_require__("./node_modules/react-dnd/lib/wrapConnectorHooks.js");

        var _wrapConnectorHooks2 = _interopRequireDefault(_wrapConnectorHooks);

        var _areOptionsEqual = __webpack_require__("./node_modules/react-dnd/lib/areOptionsEqual.js");

        var _areOptionsEqual2 = _interopRequireDefault(_areOptionsEqual);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function createSourceConnector(backend) {
            var currentHandlerId = void 0;

            var currentDragSourceNode = void 0;
            var currentDragSourceOptions = void 0;
            var disconnectCurrentDragSource = void 0;

            var currentDragPreviewNode = void 0;
            var currentDragPreviewOptions = void 0;
            var disconnectCurrentDragPreview = void 0;

            function reconnectDragSource() {
                if (disconnectCurrentDragSource) {
                    disconnectCurrentDragSource();
                    disconnectCurrentDragSource = null;
                }

                if (currentHandlerId && currentDragSourceNode) {
                    disconnectCurrentDragSource = backend.connectDragSource(currentHandlerId, currentDragSourceNode, currentDragSourceOptions);
                }
            }

            function reconnectDragPreview() {
                if (disconnectCurrentDragPreview) {
                    disconnectCurrentDragPreview();
                    disconnectCurrentDragPreview = null;
                }

                if (currentHandlerId && currentDragPreviewNode) {
                    disconnectCurrentDragPreview = backend.connectDragPreview(currentHandlerId, currentDragPreviewNode, currentDragPreviewOptions);
                }
            }

            function receiveHandlerId(handlerId) {
                if (handlerId === currentHandlerId) {
                    return;
                }

                currentHandlerId = handlerId;
                reconnectDragSource();
                reconnectDragPreview();
            }

            var hooks = (0, _wrapConnectorHooks2.default)({
                dragSource: function connectDragSource(node, options) {
                    if (node === currentDragSourceNode && (0, _areOptionsEqual2.default)(options, currentDragSourceOptions)) {
                        return;
                    }

                    currentDragSourceNode = node;
                    currentDragSourceOptions = options;

                    reconnectDragSource();
                },

                dragPreview: function connectDragPreview(node, options) {
                    if (node === currentDragPreviewNode && (0, _areOptionsEqual2.default)(options, currentDragPreviewOptions)) {
                        return;
                    }

                    currentDragPreviewNode = node;
                    currentDragPreviewOptions = options;

                    reconnectDragPreview();
                }
            });

            return {
                receiveHandlerId: receiveHandlerId,
                hooks: hooks
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/createSourceFactory.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        exports.default = createSourceFactory;

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _isPlainObject = __webpack_require__("./node_modules/lodash/isPlainObject.js");

        var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var ALLOWED_SPEC_METHODS = ["canDrag", "beginDrag", "isDragging", "endDrag"];
        var REQUIRED_SPEC_METHODS = ["beginDrag"];

        function createSourceFactory(spec) {
            Object.keys(spec).forEach(function (key) {
                (0, _invariant2.default)(ALLOWED_SPEC_METHODS.indexOf(key) > -1, "Expected the drag source specification to only have " + "some of the following keys: %s. " + "Instead received a specification with an unexpected \"%s\" key. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html", ALLOWED_SPEC_METHODS.join(", "), key);
                (0, _invariant2.default)(typeof spec[key] === "function", "Expected %s in the drag source specification to be a function. " + "Instead received a specification with %s: %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html", key, key, spec[key]);
            });
            REQUIRED_SPEC_METHODS.forEach(function (key) {
                (0, _invariant2.default)(typeof spec[key] === "function", "Expected %s in the drag source specification to be a function. " + "Instead received a specification with %s: %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html", key, key, spec[key]);
            });

            var Source = function () {
                function Source(monitor) {
                    _classCallCheck(this, Source);

                    this.monitor = monitor;
                    this.props = null;
                    this.component = null;
                }

                _createClass(Source, [{
                    key: "receiveProps",
                    value: function receiveProps(props) {
                        this.props = props;
                    }
                }, {
                    key: "receiveComponent",
                    value: function receiveComponent(component) {
                        this.component = component;
                    }
                }, {
                    key: "canDrag",
                    value: function canDrag() {
                        if (!spec.canDrag) {
                            return true;
                        }

                        return spec.canDrag(this.props, this.monitor);
                    }
                }, {
                    key: "isDragging",
                    value: function isDragging(globalMonitor, sourceId) {
                        if (!spec.isDragging) {
                            return sourceId === globalMonitor.getSourceId();
                        }

                        return spec.isDragging(this.props, this.monitor);
                    }
                }, {
                    key: "beginDrag",
                    value: function beginDrag() {
                        var item = spec.beginDrag(this.props, this.monitor, this.component);
                        if (true) {
                            (0, _invariant2.default)((0, _isPlainObject2.default)(item), "beginDrag() must return a plain object that represents the dragged item. " + "Instead received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html", item);
                        }
                        return item;
                    }
                }, {
                    key: "endDrag",
                    value: function endDrag() {
                        if (!spec.endDrag) {
                            return;
                        }

                        spec.endDrag(this.props, this.monitor, this.component);
                    }
                }]);

                return Source;
            }();

            return function createSource(monitor) {
                return new Source(monitor);
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/createSourceMonitor.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        exports.default = createSourceMonitor;

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var isCallingCanDrag = false;
        var isCallingIsDragging = false;

        var SourceMonitor = function () {
            function SourceMonitor(manager) {
                _classCallCheck(this, SourceMonitor);

                this.internalMonitor = manager.getMonitor();
            }

            _createClass(SourceMonitor, [{
                key: "receiveHandlerId",
                value: function receiveHandlerId(sourceId) {
                    this.sourceId = sourceId;
                }
            }, {
                key: "canDrag",
                value: function canDrag() {
                    (0, _invariant2.default)(!isCallingCanDrag, "You may not call monitor.canDrag() inside your canDrag() implementation. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html");

                    try {
                        isCallingCanDrag = true;
                        return this.internalMonitor.canDragSource(this.sourceId);
                    } finally {
                        isCallingCanDrag = false;
                    }
                }
            }, {
                key: "isDragging",
                value: function isDragging() {
                    (0, _invariant2.default)(!isCallingIsDragging, "You may not call monitor.isDragging() inside your isDragging() implementation. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html");

                    try {
                        isCallingIsDragging = true;
                        return this.internalMonitor.isDraggingSource(this.sourceId);
                    } finally {
                        isCallingIsDragging = false;
                    }
                }
            }, {
                key: "getItemType",
                value: function getItemType() {
                    return this.internalMonitor.getItemType();
                }
            }, {
                key: "getItem",
                value: function getItem() {
                    return this.internalMonitor.getItem();
                }
            }, {
                key: "getDropResult",
                value: function getDropResult() {
                    return this.internalMonitor.getDropResult();
                }
            }, {
                key: "didDrop",
                value: function didDrop() {
                    return this.internalMonitor.didDrop();
                }
            }, {
                key: "getInitialClientOffset",
                value: function getInitialClientOffset() {
                    return this.internalMonitor.getInitialClientOffset();
                }
            }, {
                key: "getInitialSourceClientOffset",
                value: function getInitialSourceClientOffset() {
                    return this.internalMonitor.getInitialSourceClientOffset();
                }
            }, {
                key: "getSourceClientOffset",
                value: function getSourceClientOffset() {
                    return this.internalMonitor.getSourceClientOffset();
                }
            }, {
                key: "getClientOffset",
                value: function getClientOffset() {
                    return this.internalMonitor.getClientOffset();
                }
            }, {
                key: "getDifferenceFromInitialOffset",
                value: function getDifferenceFromInitialOffset() {
                    return this.internalMonitor.getDifferenceFromInitialOffset();
                }
            }]);

            return SourceMonitor;
        }();

        function createSourceMonitor(manager) {
            return new SourceMonitor(manager);
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/createTargetConnector.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = createTargetConnector;

        var _wrapConnectorHooks = __webpack_require__("./node_modules/react-dnd/lib/wrapConnectorHooks.js");

        var _wrapConnectorHooks2 = _interopRequireDefault(_wrapConnectorHooks);

        var _areOptionsEqual = __webpack_require__("./node_modules/react-dnd/lib/areOptionsEqual.js");

        var _areOptionsEqual2 = _interopRequireDefault(_areOptionsEqual);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function createTargetConnector(backend) {
            var currentHandlerId = void 0;

            var currentDropTargetNode = void 0;
            var currentDropTargetOptions = void 0;
            var disconnectCurrentDropTarget = void 0;

            function reconnectDropTarget() {
                if (disconnectCurrentDropTarget) {
                    disconnectCurrentDropTarget();
                    disconnectCurrentDropTarget = null;
                }

                if (currentHandlerId && currentDropTargetNode) {
                    disconnectCurrentDropTarget = backend.connectDropTarget(currentHandlerId, currentDropTargetNode, currentDropTargetOptions);
                }
            }

            function receiveHandlerId(handlerId) {
                if (handlerId === currentHandlerId) {
                    return;
                }

                currentHandlerId = handlerId;
                reconnectDropTarget();
            }

            var hooks = (0, _wrapConnectorHooks2.default)({
                dropTarget: function connectDropTarget(node, options) {
                    if (node === currentDropTargetNode && (0, _areOptionsEqual2.default)(options, currentDropTargetOptions)) {
                        return;
                    }

                    currentDropTargetNode = node;
                    currentDropTargetOptions = options;

                    reconnectDropTarget();
                }
            });

            return {
                receiveHandlerId: receiveHandlerId,
                hooks: hooks
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/createTargetFactory.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        exports.default = createTargetFactory;

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _isPlainObject = __webpack_require__("./node_modules/lodash/isPlainObject.js");

        var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var ALLOWED_SPEC_METHODS = ["canDrop", "hover", "drop"];

        function createTargetFactory(spec) {
            Object.keys(spec).forEach(function (key) {
                (0, _invariant2.default)(ALLOWED_SPEC_METHODS.indexOf(key) > -1, "Expected the drop target specification to only have " + "some of the following keys: %s. " + "Instead received a specification with an unexpected \"%s\" key. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html", ALLOWED_SPEC_METHODS.join(", "), key);
                (0, _invariant2.default)(typeof spec[key] === "function", "Expected %s in the drop target specification to be a function. " + "Instead received a specification with %s: %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html", key, key, spec[key]);
            });

            var Target = function () {
                function Target(monitor) {
                    _classCallCheck(this, Target);

                    this.monitor = monitor;
                    this.props = null;
                    this.component = null;
                }

                _createClass(Target, [{
                    key: "receiveProps",
                    value: function receiveProps(props) {
                        this.props = props;
                    }
                }, {
                    key: "receiveMonitor",
                    value: function receiveMonitor(monitor) {
                        this.monitor = monitor;
                    }
                }, {
                    key: "receiveComponent",
                    value: function receiveComponent(component) {
                        this.component = component;
                    }
                }, {
                    key: "canDrop",
                    value: function canDrop() {
                        if (!spec.canDrop) {
                            return true;
                        }

                        return spec.canDrop(this.props, this.monitor);
                    }
                }, {
                    key: "hover",
                    value: function hover() {
                        if (!spec.hover) {
                            return;
                        }

                        spec.hover(this.props, this.monitor, this.component);
                    }
                }, {
                    key: "drop",
                    value: function drop() {
                        if (!spec.drop) {
                            return undefined;
                        }

                        var dropResult = spec.drop(this.props, this.monitor, this.component);
                        if (true) {
                            (0, _invariant2.default)(typeof dropResult === "undefined" || (0, _isPlainObject2.default)(dropResult), "drop() must either return undefined, or an object that represents the drop result. " + "Instead received %s. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html", dropResult);
                        }
                        return dropResult;
                    }
                }]);

                return Target;
            }();

            return function createTarget(monitor) {
                return new Target(monitor);
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/createTargetMonitor.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        exports.default = createTargetMonitor;

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        var isCallingCanDrop = false;

        var TargetMonitor = function () {
            function TargetMonitor(manager) {
                _classCallCheck(this, TargetMonitor);

                this.internalMonitor = manager.getMonitor();
            }

            _createClass(TargetMonitor, [{
                key: "receiveHandlerId",
                value: function receiveHandlerId(targetId) {
                    this.targetId = targetId;
                }
            }, {
                key: "canDrop",
                value: function canDrop() {
                    (0, _invariant2.default)(!isCallingCanDrop, "You may not call monitor.canDrop() inside your canDrop() implementation. " + "Read more: http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html");

                    try {
                        isCallingCanDrop = true;
                        return this.internalMonitor.canDropOnTarget(this.targetId);
                    } finally {
                        isCallingCanDrop = false;
                    }
                }
            }, {
                key: "isOver",
                value: function isOver(options) {
                    return this.internalMonitor.isOverTarget(this.targetId, options);
                }
            }, {
                key: "getItemType",
                value: function getItemType() {
                    return this.internalMonitor.getItemType();
                }
            }, {
                key: "getItem",
                value: function getItem() {
                    return this.internalMonitor.getItem();
                }
            }, {
                key: "getDropResult",
                value: function getDropResult() {
                    return this.internalMonitor.getDropResult();
                }
            }, {
                key: "didDrop",
                value: function didDrop() {
                    return this.internalMonitor.didDrop();
                }
            }, {
                key: "getInitialClientOffset",
                value: function getInitialClientOffset() {
                    return this.internalMonitor.getInitialClientOffset();
                }
            }, {
                key: "getInitialSourceClientOffset",
                value: function getInitialSourceClientOffset() {
                    return this.internalMonitor.getInitialSourceClientOffset();
                }
            }, {
                key: "getSourceClientOffset",
                value: function getSourceClientOffset() {
                    return this.internalMonitor.getSourceClientOffset();
                }
            }, {
                key: "getClientOffset",
                value: function getClientOffset() {
                    return this.internalMonitor.getClientOffset();
                }
            }, {
                key: "getDifferenceFromInitialOffset",
                value: function getDifferenceFromInitialOffset() {
                    return this.internalMonitor.getDifferenceFromInitialOffset();
                }
            }]);

            return TargetMonitor;
        }();

        function createTargetMonitor(manager) {
            return new TargetMonitor(manager);
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/decorateHandler.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } }
                }
                return target;
            };

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        exports.default = decorateHandler;

        var _react = __webpack_require__(0);

        var _react2 = _interopRequireDefault(_react);

        var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

        var _propTypes2 = _interopRequireDefault(_propTypes);

        var _disposables = __webpack_require__("./node_modules/disposables/modules/index.js");

        var _isPlainObject = __webpack_require__("./node_modules/lodash/isPlainObject.js");

        var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _hoistNonReactStatics = __webpack_require__("./node_modules/react-dnd/node_modules/hoist-non-react-statics/index.js");

        var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

        var _shallowEqual = __webpack_require__("./node_modules/react-dnd/lib/utils/shallowEqual.js");

        var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

        var _shallowEqualScalar = __webpack_require__("./node_modules/react-dnd/lib/utils/shallowEqualScalar.js");

        var _shallowEqualScalar2 = _interopRequireDefault(_shallowEqualScalar);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); }
            subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: false, writable: true, configurable: true}});
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        function decorateHandler(_ref) {
            var _class, _temp;

            var DecoratedComponent   = _ref.DecoratedComponent,
                createHandler        = _ref.createHandler,
                createMonitor        = _ref.createMonitor,
                createConnector      = _ref.createConnector,
                registerHandler      = _ref.registerHandler,
                containerDisplayName = _ref.containerDisplayName,
                getType              = _ref.getType,
                collect              = _ref.collect,
                options              = _ref.options;
            var _options$arePropsEqua = options.arePropsEqual,
                arePropsEqual         = _options$arePropsEqua === undefined ? _shallowEqualScalar2.default : _options$arePropsEqua;

            var displayName = DecoratedComponent.displayName || DecoratedComponent.name || "Component";

            var DragDropContainer = (_temp = _class = function (_Component) {
                _inherits(DragDropContainer, _Component);

                _createClass(DragDropContainer, [{
                    key: "getHandlerId",
                    value: function getHandlerId() {
                        return this.handlerId;
                    }
                }, {
                    key: "getDecoratedComponentInstance",
                    value: function getDecoratedComponentInstance() {
                        return this.decoratedComponentInstance;
                    }
                }, {
                    key: "shouldComponentUpdate",
                    value: function shouldComponentUpdate(nextProps, nextState) {
                        return !arePropsEqual(nextProps, this.props) || !(0, _shallowEqual2.default)(nextState, this.state);
                    }
                }]);

                function DragDropContainer(props, context) {
                    _classCallCheck(this, DragDropContainer);

                    var _this = _possibleConstructorReturn(this, (DragDropContainer.__proto__ || Object.getPrototypeOf(DragDropContainer)).call(this, props, context));

                    _this.handleChange = _this.handleChange.bind(_this);
                    _this.handleChildRef = _this.handleChildRef.bind(_this);

                    (0, _invariant2.default)(_typeof(_this.context.dragDropManager) === "object", "Could not find the drag and drop manager in the context of %s. " + "Make sure to wrap the top-level component of your app with DragDropContext. " + "Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context", displayName, displayName);

                    _this.manager = _this.context.dragDropManager;
                    _this.handlerMonitor = createMonitor(_this.manager);
                    _this.handlerConnector = createConnector(_this.manager.getBackend());
                    _this.handler = createHandler(_this.handlerMonitor);

                    _this.disposable = new _disposables.SerialDisposable();
                    _this.receiveProps(props);
                    _this.state = _this.getCurrentState();
                    _this.dispose();
                    return _this;
                }

                _createClass(DragDropContainer, [{
                    key: "componentDidMount",
                    value: function componentDidMount() {
                        this.isCurrentlyMounted = true;
                        this.disposable = new _disposables.SerialDisposable();
                        this.currentType = null;
                        this.receiveProps(this.props);
                        this.handleChange();
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function componentWillReceiveProps(nextProps) {
                        if (!arePropsEqual(nextProps, this.props)) {
                            this.receiveProps(nextProps);
                            this.handleChange();
                        }
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function componentWillUnmount() {
                        this.dispose();
                        this.isCurrentlyMounted = false;
                    }
                }, {
                    key: "receiveProps",
                    value: function receiveProps(props) {
                        this.handler.receiveProps(props);
                        this.receiveType(getType(props));
                    }
                }, {
                    key: "receiveType",
                    value: function receiveType(type) {
                        if (type === this.currentType) {
                            return;
                        }

                        this.currentType = type;

                        var _registerHandler = registerHandler(type, this.handler, this.manager),
                            handlerId        = _registerHandler.handlerId,
                            unregister       = _registerHandler.unregister;

                        this.handlerId = handlerId;
                        this.handlerMonitor.receiveHandlerId(handlerId);
                        this.handlerConnector.receiveHandlerId(handlerId);

                        var globalMonitor = this.manager.getMonitor();
                        var unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, {handlerIds: [handlerId]});

                        this.disposable.setDisposable(new _disposables.CompositeDisposable(new _disposables.Disposable(unsubscribe), new _disposables.Disposable(unregister)));
                    }
                }, {
                    key: "handleChange",
                    value: function handleChange() {
                        if (!this.isCurrentlyMounted) {
                            return;
                        }

                        var nextState = this.getCurrentState();
                        if (!(0, _shallowEqual2.default)(nextState, this.state)) {
                            this.setState(nextState);
                        }
                    }
                }, {
                    key: "dispose",
                    value: function dispose() {
                        this.disposable.dispose();
                        this.handlerConnector.receiveHandlerId(null);
                    }
                }, {
                    key: "handleChildRef",
                    value: function handleChildRef(component) {
                        this.decoratedComponentInstance = component;
                        this.handler.receiveComponent(component);
                    }
                }, {
                    key: "getCurrentState",
                    value: function getCurrentState() {
                        var nextState = collect(this.handlerConnector.hooks, this.handlerMonitor);

                        if (true) {
                            (0, _invariant2.default)((0, _isPlainObject2.default)(nextState), "Expected `collect` specified as the second argument to " + "%s for %s to return a plain object of props to inject. " + "Instead, received %s.", containerDisplayName, displayName, nextState);
                        }

                        return nextState;
                    }
                }, {
                    key: "render",
                    value: function render() {
                        return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, this.state, {
                            ref: this.handleChildRef
                        }));
                    }
                }]);

                return DragDropContainer;
            }(_react.Component), _class.DecoratedComponent = DecoratedComponent, _class.displayName = containerDisplayName + "(" + displayName + ")", _class.contextTypes = {
                dragDropManager: _propTypes2.default.object.isRequired
            }, _temp);


            return (0, _hoistNonReactStatics2.default)(DragDropContainer, DecoratedComponent);
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/index.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _DragDropContext = __webpack_require__("./node_modules/react-dnd/lib/DragDropContext.js");

        Object.defineProperty(exports, "DragDropContext", {
            enumerable: true,
            get: function get() {
                return _interopRequireDefault(_DragDropContext).default;
            }
        });

        var _DragDropContextProvider = __webpack_require__("./node_modules/react-dnd/lib/DragDropContextProvider.js");

        Object.defineProperty(exports, "DragDropContextProvider", {
            enumerable: true,
            get: function get() {
                return _interopRequireDefault(_DragDropContextProvider).default;
            }
        });

        var _DragLayer = __webpack_require__("./node_modules/react-dnd/lib/DragLayer.js");

        Object.defineProperty(exports, "DragLayer", {
            enumerable: true,
            get: function get() {
                return _interopRequireDefault(_DragLayer).default;
            }
        });

        var _DragSource = __webpack_require__("./node_modules/react-dnd/lib/DragSource.js");

        Object.defineProperty(exports, "DragSource", {
            enumerable: true,
            get: function get() {
                return _interopRequireDefault(_DragSource).default;
            }
        });

        var _DropTarget = __webpack_require__("./node_modules/react-dnd/lib/DropTarget.js");

        Object.defineProperty(exports, "DropTarget", {
            enumerable: true,
            get: function get() {
                return _interopRequireDefault(_DropTarget).default;
            }
        });

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/registerSource.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = registerSource;
        function registerSource(type, source, manager) {
            var registry = manager.getRegistry();
            var sourceId = registry.addSource(type, source);

            function unregisterSource() {
                registry.removeSource(sourceId);
            }

            return {
                handlerId: sourceId,
                unregister: unregisterSource
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/registerTarget.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = registerTarget;
        function registerTarget(type, target, manager) {
            var registry = manager.getRegistry();
            var targetId = registry.addTarget(type, target);

            function unregisterTarget() {
                registry.removeTarget(targetId);
            }

            return {
                handlerId: targetId,
                unregister: unregisterTarget
            };
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/utils/checkDecoratorArguments.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = checkDecoratorArguments;
        function checkDecoratorArguments(functionName, signature) {
            if (true) {
                for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i += 1) {
                    var arg = arguments.length <= i + 2 ? undefined : arguments[i + 2];
                    if (arg && arg.prototype && arg.prototype.render) {
                        console.error( // eslint-disable-line no-console
                            "You seem to be applying the arguments in the wrong order. " + ("It should be " + functionName + "(" + signature + ")(Component), not the other way around. ") + "Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#you-seem-to-be-applying-the-arguments-in-the-wrong-order");
                        return;
                    }
                }
            }
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/utils/cloneWithRef.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = cloneWithRef;

        var _invariant = __webpack_require__("./node_modules/invariant/browser.js");

        var _invariant2 = _interopRequireDefault(_invariant);

        var _react = __webpack_require__(0);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function cloneWithRef(element, newRef) {
            var previousRef = element.ref;
            (0, _invariant2.default)(typeof previousRef !== "string", "Cannot connect React DnD to an element with an existing string ref. " + "Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. " + "Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute");

            if (!previousRef) {
                // When there is no ref on the element, use the new ref directly
                return (0, _react.cloneElement)(element, {
                    ref: newRef
                });
            }

            return (0, _react.cloneElement)(element, {
                ref: function ref(node) {
                    newRef(node);

                    if (previousRef) {
                        previousRef(node);
                    }
                }
            });
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/utils/isValidType.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        exports.default = isValidType;

        var _isArray = __webpack_require__("./node_modules/lodash/isArray.js");

        var _isArray2 = _interopRequireDefault(_isArray);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function isValidType(type, allowArray) {
            return typeof type === "string" || (typeof type === "undefined" ? "undefined" : _typeof(type)) === "symbol" || allowArray && (0, _isArray2.default)(type) && type.every(function (t) {
                    return isValidType(t, false);
                });
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/utils/shallowEqual.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = shallowEqual;
        function shallowEqual(objA, objB) {
            if (objA === objB) {
                return true;
            }

            var keysA = Object.keys(objA);
            var keysB = Object.keys(objB);

            if (keysA.length !== keysB.length) {
                return false;
            }

            // Test for A's keys different from B.
            var hasOwn = Object.prototype.hasOwnProperty;
            for (var i = 0; i < keysA.length; i += 1) {
                if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                    return false;
                }

                var valA = objA[keysA[i]];
                var valB = objB[keysA[i]];

                if (valA !== valB) {
                    return false;
                }
            }

            return true;
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/utils/shallowEqualScalar.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        exports.default = shallowEqualScalar;
        function shallowEqualScalar(objA, objB) {
            if (objA === objB) {
                return true;
            }

            if ((typeof objA === "undefined" ? "undefined" : _typeof(objA)) !== "object" || objA === null || (typeof objB === "undefined" ? "undefined" : _typeof(objB)) !== "object" || objB === null) {
                return false;
            }

            var keysA = Object.keys(objA);
            var keysB = Object.keys(objB);

            if (keysA.length !== keysB.length) {
                return false;
            }

            // Test for A's keys different from B.
            var hasOwn = Object.prototype.hasOwnProperty;
            for (var i = 0; i < keysA.length; i += 1) {
                if (!hasOwn.call(objB, keysA[i])) {
                    return false;
                }

                var valA = objA[keysA[i]];
                var valB = objB[keysA[i]];

                if (valA !== valB || (typeof valA === "undefined" ? "undefined" : _typeof(valA)) === "object" || (typeof valB === "undefined" ? "undefined" : _typeof(valB)) === "object") {
                    return false;
                }
            }

            return true;
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/lib/wrapConnectorHooks.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = wrapConnectorHooks;

        var _react = __webpack_require__(0);

        var _cloneWithRef = __webpack_require__("./node_modules/react-dnd/lib/utils/cloneWithRef.js");

        var _cloneWithRef2 = _interopRequireDefault(_cloneWithRef);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function throwIfCompositeComponentElement(element) {
            // Custom components can no longer be wrapped directly in React DnD 2.0
            // so that we don't need to depend on findDOMNode() from react-dom.
            if (typeof element.type === "string") {
                return;
            }

            var displayName = element.type.displayName || element.type.name || "the component";

            throw new Error("Only native element nodes can now be passed to React DnD connectors." + ("You can either wrap " + displayName + " into a <div>, or turn it into a ") + "drag source or a drop target itself.");
        }

        function wrapHookToRecognizeElement(hook) {
            return function () {
                var elementOrNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                // When passed a node, call the hook straight away.
                if (!(0, _react.isValidElement)(elementOrNode)) {
                    var node = elementOrNode;
                    hook(node, options);
                    return undefined;
                }

                // If passed a ReactElement, clone it and attach this function as a ref.
                // This helps us achieve a neat API where user doesn't even know that refs
                // are being used under the hood.
                var element = elementOrNode;
                throwIfCompositeComponentElement(element);

                // When no options are passed, use the hook directly
                var ref = options ? function (node) {
                    return hook(node, options);
                } : hook;

                return (0, _cloneWithRef2.default)(element, ref);
            };
        }

        function wrapConnectorHooks(hooks) {
            var wrappedHooks = {};

            Object.keys(hooks).forEach(function (key) {
                var hook = hooks[key];
                var wrappedHook = wrapHookToRecognizeElement(hook);
                wrappedHooks[key] = function () {
                    return wrappedHook;
                };
            });

            return wrappedHooks;
        }

        /***/
    }),

    /***/ "./node_modules/react-dnd/node_modules/hoist-non-react-statics/index.js": /***/ (function (module, exports, __webpack_require__) {

        "use strict";
        /**
         * Copyright 2015, Yahoo! Inc.
         * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
         */


        var REACT_STATICS = {
            childContextTypes: true,
            contextTypes: true,
            defaultProps: true,
            displayName: true,
            getDefaultProps: true,
            mixins: true,
            propTypes: true,
            type: true
        };

        var KNOWN_STATICS = {
            name: true,
            length: true,
            prototype: true,
            caller: true,
            arguments: true,
            arity: true
        };

        var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === "function";

        module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
            if (typeof sourceComponent !== "string") { // don't hoist over string (html) components
                var keys = Object.getOwnPropertyNames(sourceComponent);

                /* istanbul ignore else */
                if (isGetOwnPropertySymbolsAvailable) {
                    keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
                }

                for (var i = 0; i < keys.length; ++i) {
                    if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                        try {
                            targetComponent[keys[i]] = sourceComponent[keys[i]];
                        } catch (error) {

                        }
                    }
                }
            }

            return targetComponent;
        };


        /***/
    })

});
//# sourceMappingURL=react-dnd.js.map