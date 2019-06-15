from flask import Flask  # Import the Flask class
from .views import blueprints

app = Flask(__name__)    # Create an instance of the class for our use

for b in blueprints:
    app.register_blueprint(b)
