# coding=utf-8
from flask import render_template
from flask import Blueprint
from flask import redirect, url_for

blog = Blueprint('blog', __name__)


@blog.route("/blog/")
def index():
    return redirect(url_for('.blogShow', path='guest'))


@blog.route('/blog/<path>/')
def blogShow(path):
    return render_template("blog/blog.html")
