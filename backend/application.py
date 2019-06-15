from flask import Flask
from werkzeug.wsgi import DispatcherMiddleware
from admin.app import app as admin
from api.app import app as api

frontend = Flask(__name__, static_url_path='')

#@frontend.route('/', defaults={'path': 'index.html'})
#@frontend.route('/<path:path>')
#def spa(path):
#    return path


application = DispatcherMiddleware(frontend, {
    '/api': api,
    '/admin': admin
})
