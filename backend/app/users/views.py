import functools
from flask import g, redirect, url_for, flash, request, Blueprint
from app import db
from .models import User

users = Blueprint('users', __name__, url_prefix='/users')


def login_required(view):
    """View decorator that redirects anonymous users to the login page."""

    @functools.wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("auth.login"))

        return view(*args, **kwargs)

    return wrapped_view


@users.route("/register", methods=["POST"])
def register():
    """Register a new user.
    Validates that the username is not already taken. Hashes the
    password for security.
    """
    if request.method == "POST":
        user = request.get_json()

        error = None

        if not user.username:
            error = "Username is required."
        elif not user.password:
            error = "Password is required."
        elif db.session.query(
            User.query.filter_by(username=user.username).exists()
        ).scalar():
            error = f"User {username} is already registered."

        if error is None:
            # the name is available, create the user and go to the login page
            db.session.add(
                User(username=user.username, password=user.password))
            db.session.commit()
            return redirect(url_for("auth.login"))

        flash(error)
