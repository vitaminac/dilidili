# coding=utf-8
from dynamicCreateApp import createApp


def makeApp(config, log=True):
    from danmu import danmu
    app = createApp(config, list(map(lambda m: m.__name__, [danmu])), __name__)
    return app
