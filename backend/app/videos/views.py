from flask import Blueprint, jsonify, request
videos = Blueprint('videos', __name__, url_prefix='/videos')


@videos.route("/<int:id>", methods=["GET"])
def update(id):
    return jsonify(id)


@videos.route("/", methods=["GET"])
def list():
    page = request.args.get('page')
    if not page:
        page = 1
