
from flask import Flask  # Import the Flask class
from flask_sqlalchemy import SQLAlchemy

from .command import init_db_command

db = SQLAlchemy()


def create_app(config):
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object(config)

    # initialize Flask-SQLAlchemy and the init-db command
    db.init_app(app)
    app.cli.add_command(init_db_command)

    # apply the blueprints to the app
    from app.users import users
    from app.videos import videos
    from app.views import root

    blueprints = [root, users, videos]
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

    # make url_for('index') == url_for('blog.index')
    # in another app, you might define a separate main index here with
    # app.route, while giving the blog blueprint a url_prefix, but for
    # the tutorial the blog will be the main index
    app.add_url_rule("/", endpoint="index")

    return app
