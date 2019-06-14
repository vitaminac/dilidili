# coding=utf-8
from instance.settings import ConnectionURIs


class BasicConfig():
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = ConnectionURIs
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    EMAIL = "supermanenchina@gmail.com"
    SQLALCHEMY_ECHO = True
