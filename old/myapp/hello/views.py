# coding=utf-8
from flask import render_template, Blueprint, request,make_response,redirect,abort
from myapp.hello.models import MESSAGES

hello = Blueprint('cors', __name__)


@hello.route('/cors')
def hello_world():
    user = request.args.get('user', 'Guest')
    return render_template('index.html', user=user)

@hello.route('/search')
def baidu():
    return redirect('http://www.google.com')

@hello.route('/')
def index():
    user_agent = request.headers.get('User-Agent')
    response = make_response('<p>Your browser is %s</p>'% user_agent)
    response.set_cookie('answer','42')
    return  response

@hello.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

@hello.route('/user/<name>')
def user(name):
    if ' ' not in name:
        abort(404)
    return '<h1>Hello,% s! </h1> ' % name


@hello.route('/hola')
def hola():
    return render_template('here.html')


@hello.route('/show/<key>')
def get_message(key):
    return MESSAGES.get(key) or "%s not found!" % key


@hello.route('/add/<key>/<message>')
def add_or_update_message(key, message):
    MESSAGES[key] = message
    return "%s Added/Updated" % key

@hello.route('/test/')
def test():
    return render_template('test.html')
