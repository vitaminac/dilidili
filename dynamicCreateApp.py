# coding=utf-8
import atexit
import importlib
import logging
import os
from logging import DEBUG

from flask import Flask, request, render_template, current_app
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import HTTPException, BadRequest

db = SQLAlchemy()
from models import RequestLog


def createApp(config, modules=None, package=None, log=True, template_folder='./templates'):
    app = Flask(package or __name__, template_folder=template_folder,
                static_folder=os.path.join(os.path.dirname(os.path.realpath(__file__)), 'static'))
    app.config.from_object(config)
    db.init_app(app)
    if modules:
        for moduleName in modules:
            if "." in moduleName:
                moduleName = moduleName.split(".")[-1]
            moduleNameForImport = moduleName + ".views"
            if package:
                moduleNameForImport = package + "." + moduleNameForImport
            m = importlib.import_module(moduleNameForImport)
            app.register_blueprint(getattr(m, moduleName))

    if log:
        # initialize the log handler
        logger = logging.getLogger('werkzeug')
        logHandler = logging.FileHandler('./log/info.log')
        # set the log handler level
        logHandler.setLevel(DEBUG)
        logger.addHandler(logHandler)
        app.logger.addHandler(logHandler)

    # @app.route(app.static_url_path + '/js/<path:filename>')
    # def base_static(filename):
    #     return send_from_directory(app.root_path + '/../client/dist', filename)

    @app.after_request
    def removeHeader(response):
        response.headers["server"] = "nginx"
        return response

    @app.before_request
    def logViewsHistory():
        db.session.add(RequestLog(request.path))
        db.session.commit()

    def handleError(e):
        if e.__class__ not in HTTPException.__subclasses__():
            e = BadRequest()
        return render_template("error.html", code=e.code, name=e.name, description=e.description,
                               email=current_app.config["EMAIL"]), e.code

    # register for each bad request exception
    for cls in HTTPException.__subclasses__():
        if cls.code > 399:
            app.register_error_handler(cls, handleError)

    app.jinja_loader.searchpath.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'templates'))

    def beforeCloseHandler():
        print("closing")

    atexit.register(beforeCloseHandler)

    with app.app_context():
        # Extensions like Flask-SQLAlchemy now know what the "current" app
        # is while within this block. Therefore, you can now run........
        db.create_all()

    return app
