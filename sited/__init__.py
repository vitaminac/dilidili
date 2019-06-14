# coding=utf-8
from werkzeug.routing import Rule

from dynamicCreateApp import createApp


def makeApp(config, log=True):
    from sited import react, cors
    app = createApp(config, list(map(lambda m: m.__name__, [cors, react])), __name__)

    app.url_map.add(Rule('/cors=<path:path>', endpoint="cors"))
    return app
