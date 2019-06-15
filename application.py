import os
from flask import Flask, request, send_from_directory
from werkzeug.wsgi import DispatcherMiddleware
from admin.app import app as admin
from api.app import app as api

frontend = Flask(__name__)


@frontend.route('/', defaults={'path': 'index.html'})
@frontend.route('/<path:path>')
def spa(path):
    print(path)
    return send_from_directory('react/build', path)


application = DispatcherMiddleware(frontend, {
    '/api': api,
    '/admin': admin
})

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 5000, application, use_reloader=True,
               use_debugger=True, use_evalex=True, static_files={"/static": os.path.join(os.path.dirname(__file__), 'react/build/static')})
