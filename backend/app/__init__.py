import click
from flask import Flask  # Import the Flask class
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)    # Create an instance of the class for our use
db = SQLAlchemy()


def init_db():
    db.drop_all()
    db.create_all()


@click.command("init-db")
@with_appcontext
def init_db_command():
    """Clear existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")


def create_app(config):
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object(config)

    # initialize Flask-SQLAlchemy and the init-db command
    db.init_app(app)
    app.cli.add_command(init_db_command)

    from app.users import users
    from app.videos import videos
    from app.views import root

    blueprints = [root, users, videos]
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

    return app
