# coding=utf-8
from werkzeug.serving import run_simple
from werkzeug.wsgi import DispatcherMiddleware

from danmu import makeApp as makeDanmu
from instance.config import BasicConfig
from myapp import makeApp as makeMyaap
from sited import makeApp as makeSited

if __name__ == '__main__':
    helloWorld = makeMyaap(BasicConfig)
    sited = makeSited(BasicConfig)
    danmu = makeDanmu(BasicConfig)
    app = DispatcherMiddleware(helloWorld, {
        '/sited': sited,
        '/danmu': danmu
    })
    run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True, use_evalex=True)
