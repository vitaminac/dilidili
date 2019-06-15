from . import auth


@auth.route("/me")
def who():
    return "Username"


@auth.route("/")
def whoam():
    return "Who am I"
