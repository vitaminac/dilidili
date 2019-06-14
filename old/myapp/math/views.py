# coding=utf-8
from flask import Blueprint, render_template

math = Blueprint('math', __name__)


@math.route('/math')
def math_index():
    return render_template('math.html')

@math.route('/why')
def why():
    return render_template('why.html')