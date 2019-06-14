# coding=utf-8
from functools import update_wrapper

import requests
from flask import Blueprint, request as rq, abort
from flask_cors import cross_origin

cors = Blueprint('cors', __name__)

proxies = {
    "http": "127.0.0.1:8080",
    "https": "127.0.0.1:8080"
}


def filterHeader(xhr=False, neededHeader=None, listOfHeaderForRemove=None):
    if not isinstance(listOfHeaderForRemove, list):
        listOfHeaderForRemove = []
    if not isinstance(neededHeader, list):
        neededHeader = []

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            headers = dict(rq.headers)
            if (not (xhr and rq.is_xhr)) or any(map(lambda x: x not in headers.keys(), neededHeader)):
                abort(404)
            else:
                for k in listOfHeaderForRemove:
                    try:
                        del headers[k]
                    except KeyError:
                        pass
                return f(*args, headers=headers, **kwargs)

        return update_wrapper(wrapped_function, f)

    return decorator


@cors.endpoint("cors")
@cross_origin(neededHeader=["User-Agent"], origin='*', allow_headers=['X-Requested-With'], supports_credentials=True)
@filterHeader(xhr=True, listOfHeaderForRemove=["Host", "X-Requested-With", "Referer", "Origin"])
def corsHtml(path, headers=None):
    if headers is None:
        headers = {}
    if len(headers["User-Agent"]) > 30:
        r = requests.request(rq.method, path, params=rq.args, data=rq.form, json=rq.json, headers=headers, cookies=rq.cookies, files=rq.files, verify=False, proxies=proxies)
        return r.text
