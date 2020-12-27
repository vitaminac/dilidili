import { Switch, Route } from "react-router-dom";
import { ROUTES } from "./config";
import ViewPage from "./containers/ViewPage";
import SortPage from "./containers/SortPage";
import SearchPage from "./containers/SearchPage";
import BangumiInfoPage from "./containers/BangumiInfoPage";
import BangumiIndexPage from "./containers/BangumiIndexPage";
import IndexPage from "./containers/IndexPage";

export default (
  <Switch>
    <Route path="/sort/:tid" component={SortPage} />
    <Route path={ROUTES.VIDEO + "/:aid"} component={ViewPage} />
    <Route path={ROUTES.SEARCH + "/:keyword"} component={SearchPage} />
    <Route path={ROUTES.BANGUMI + "/:seasonId"} component={BangumiInfoPage} />
    <Route path="/bangumiindex" component={BangumiIndexPage} />
    <Route path="/" component={IndexPage} />
  </Switch>
);
