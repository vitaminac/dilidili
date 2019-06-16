from flask import url_for

from app import db
from app.users.models import User


class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uploader_id = db.Column(db.ForeignKey(User.id), nullable=False)
    title = db.Column(db.String, nullable=False)

    @property
    def href(self):
        return url_for("videos.view", id=self.id)