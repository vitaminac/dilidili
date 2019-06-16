import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App.js';
import ViewPage from './page/ViewPage';
import SortPage from './page/SortPage';
import SearchPage from './page/SearchPage';
import BangumiInfoPage from './page/BangumiInfoPage';
import BangumiIndexPage from './page/BangumiIndexPage';
import { VIDEO_ROUTE_PREFIX, BANGUMI_ROUTE_PREFIX } from './Config';

export default function AppRouter() {
    return (
        <Router>
            <App>
                <Route path="/sort/:tid" component={SortPage} />
                <Route path={VIDEO_ROUTE_PREFIX + ":aid"} component={ViewPage} />
                <Route path="/search/:keyword" component={SearchPage} />
                <Route path={BANGUMI_ROUTE_PREFIX + ":seasonId"} component={BangumiInfoPage} />
                <Route path="/bangumiindex" component={BangumiIndexPage} />
            </App>
        </Router>
    );
}