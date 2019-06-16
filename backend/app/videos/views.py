from flask import Blueprint, jsonify
videos = Blueprint('videos', __name__, url_prefix='/videos')


@videos.route("/<int:id>", methods=["GET"])
def update(id):
    return jsonify(id)
