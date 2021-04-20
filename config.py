import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'placeholder'
    DATABASE = 'database.db'
    TESTING = False
