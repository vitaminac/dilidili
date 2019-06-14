# coding=utf-8
from dynamicCreateApp import createApp


def makeApp(config, log=True):
    from myapp import hello, product, math, blog, flash
    app = createApp(config, list(map(lambda m: m.__name__, [hello, product, math, blog, flash])), __name__)
    return app
