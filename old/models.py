# coding=utf-8
from datetime import datetime

from dynamicCreateApp import db


def createRequestLogTable(engine):
    db.create_all()


class RequestLog(db.Model):
    __tablename__ = 'requestlog'
    time = db.Column('time', db.DateTime, nullable=False, primary_key=True)
    path = db.Column('path', db.String(length=2000), nullable=False)

    def __init__(self, path):
        self.path = path
        self.time = datetime.now()
