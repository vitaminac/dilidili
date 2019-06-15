from werkzeug.wsgi import DispatcherMiddleware
from app.app import app as frontend
from api.app import app as backend

application = DispatcherMiddleware(frontend, {
    '/api':     backend
})

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 5000, application, use_reloader=True,
               use_debugger=True, use_evalex=True)
