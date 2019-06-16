from flask import request, jsonify
from . import api


@api.route('/')
def root():
    keyword = request.args.get('keyword')
    if keyword is not None:
        # TODO: seach api
        return jsonify({
            "keyword": keyword
        })
    return "Hello 123"
