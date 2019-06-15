from flask import Flask
from werkzeug.wsgi import DispatcherMiddleware
from admin.app import app as admin
from api.app import app as api

frontend = Flask(__name__)

application = DispatcherMiddleware(frontend, {
    '/api': api,
    '/admin': admin
})
