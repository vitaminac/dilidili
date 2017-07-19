from flask import render_template, Blueprint

flash = Blueprint('flash', __name__, template_folder="./templates")


@flash.route("/flash/")
def index():
    return render_template("flash.html")
