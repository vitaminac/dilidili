# coding=utf-8
from sqlalchemy.engine.url import URL

DATABASE = {
    'drivername': 'postgres',
    'username': 'flaskreadonly',
    'password': 'TYjOkvDkXlIie6t0',
    'host': 'localhost',
    'port': '5432',
    'database': 'flaskdb'
}

ConnectionURIs = URL(**DATABASE)
