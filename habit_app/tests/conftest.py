import os
import tempfile
import pytest
import flask_restful
import sys
from flask import current_app
from flask_login import LoginManager
sys.path.append("D:\habit-tracker\habit_app\\api\database.py")
sys.path.append("D:\habit-tracker\habit_app\\api")

import habit_app.api as api
from habit_app.api.api import create_app
from habit_app.api.database import init_db,get_db
import habit_app.api.auth as auth_file


with open(os.path.join(os.path.dirname(__file__), 'start_data.sql'), 'rb') as f:
    _test_data_sql = f.read().decode("utf8")


@pytest.fixture
def app():
    """Create a new app instance for each test."""
    db_fd, db_path = tempfile.mkstemp()
    app, api = create_app({"TESTING": True, "DATABASE": db_path})

    with app.app_context():
        init_db(app)
        get_db().executescript(_test_data_sql)
        #auth_file.login_manager.init_app(app)

    yield app

    # teardown
    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def client(app):
    """Create a client to use during tests"""
    return app.test_client()


class AuthActions(object):
    """Class to use in later fixture which automates login to test user"""

    def __init__(self, client):
        self._client = client
        self.user = 'www'
        self.access_token = ""

    def login(self, username='www', password='xxx'):
        self.user = username
        res = self._client.post(
            "/auth/login", json={'username': username, 'password': password}
        )
        if b'access_token' in res.data:
            self.access_token = res.json['access_token']
        return res

    def logout(self):
        return self._client.get('/auth/logout')


@pytest.fixture
def auth(client):
    return AuthActions(client)
