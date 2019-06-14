# coding=utf-8
from werkzeug.exceptions import abort
from flask import render_template
from flask import Blueprint
from myapp.product.models import PRODUCTS

product = Blueprint('product', __name__)

@product.route('/home')
def home():
    return render_template('product_home.html', products=PRODUCTS)

@product.route('/product/<key>')
def showProduct(key):
    product = PRODUCTS.get(key)
    if not product:
        abort(404)
    return render_template('product.html', product=product)

@product.context_processor
def some_processor():
    def full_name(product):
        return '{0} / {1}'.format(product['category'],product['name'])
    return {'full_name': full_name}
