from flask import Flask
from config import Config


app = Flask(__name__)
app.config.from_object(Config)
from database import init_db
with app.app_context():
    db = init_db()

from app import routes