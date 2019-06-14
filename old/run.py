# coding=utf-8
from werkzeug.serving import run_simple
from werkzeug.wsgi import DispatcherMiddleware

from danmu import makeApp as makeDanmu
from instance.config import BasicConfig
from myapp import makeApp as makeMyaap
from sited import makeApp as makeSited
from test import makeApp as makeTest

if __name__ == '__main__':
    helloWorld = makeMyaap(BasicConfig)
    sited = makeSited(BasicConfig)
    danmu = makeDanmu(BasicConfig)
    test = makeTest(BasicConfig)
    app = DispatcherMiddleware(helloWorld, {
        '/sited': sited,
        '/danmu': danmu,
        '/test' : test
    })
    run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True, use_evalex=True)
