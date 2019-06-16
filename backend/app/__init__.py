import click
from flask import Flask  # Import the Flask class
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)    # Create an instance of the class for our use
db = SQLAlchemy()


def init_db():
    db.drop_all()
    db.create_all()


def insert_data():
    if app.config['DEBUG']:
        from app.users.models import Uploader
        from app.videos.models import Video
        with app.app_context():
            uploader = Uploader(username='Uploader', password='1234')
            db.session.add(uploader)
            video = Video(uploader_id=uploader.id, title="关于我转生变成史莱姆这件事")
            db.session.add(video)
            db.session.commit()


@click.command("init-db")
@with_appcontext
# Extensions like Flask-SQLAlchemy now know what the "current" app
# is while within this block. Therefore, you can now run........
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
