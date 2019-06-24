import click
from flask.cli import with_appcontext


def init_db(db):
    from app.users.models import Uploader
    from app.videos.models import Video
    db.drop_all()
    db.create_all()
    uploader = Uploader(username='Uploader', password='1234')
    db.session.add(uploader)
    db.session.flush()
    video = Video(uploader_id=uploader.id, title="关于我转生变成史莱姆这件事")
    db.session.add(video)
    db.session.commit()


@click.command("init-db")
@with_appcontext
# Extensions like Flask-SQLAlchemy now know what the "current" app
# is while within this block. Therefore, you can now run........
def init_db_command():
    """Clear existing data and create new tables."""
    from . import db
    init_db(db)
    click.echo("Initialized the database.")
