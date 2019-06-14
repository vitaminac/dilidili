# coding=utf-8

from flask import render_template, Blueprint

react = Blueprint('react', __name__, template_folder='templates')


# @react.route("/")
# def defaultRedirect():
#     return redirect(url_for(".home", **{"path": "home"}))

@react.route('/', defaults={'path': ''})
@react.route('/<path:path>')
def home(path):
    return render_template('index.html')
