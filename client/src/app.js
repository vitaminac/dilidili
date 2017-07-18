import { Provider } from "react-redux";
import { history, store } from "./store";

import Sited from "./sited";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";

import initService from "./services";
initService();
/* ConnectedRouter will use the store from Provider automatically */
export default (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/sited" component={Sited}/>
        </ConnectedRouter>
    </Provider>
);
