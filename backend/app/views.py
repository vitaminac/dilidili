from flask import request, jsonify, Blueprint

root = Blueprint('root', __name__)


@root.route('/')
def search():
    keyword = request.args.get('keyword')
    if keyword is not None:
        # TODO: seach api
        return jsonify({
            "keyword": keyword
        })
    return "Hello 123"
