import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware, routerReducer } from "react-router-redux";

import reducers from "./reducer/index"; // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const composeEnhancers =
          (typeof window === "object" && process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(middleware)
    // other store enhancers if any
);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    {},
    enhancer
);

export { store as default, store, history };
