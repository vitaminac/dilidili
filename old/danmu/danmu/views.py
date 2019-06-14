# coding=utf-8
from flask import Blueprint, send_from_directory

danmu = Blueprint('danmu', __name__, static_folder="danmaku")


@danmu.route('/<path:path>')
def send_static_file(path):
    if (path.endswith("/")):
        path += "index.html"
    return send_from_directory("danmaku/", path)
