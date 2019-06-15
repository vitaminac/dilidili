from . import api


@api.route('/')
def test():
    return "Hello 123"
