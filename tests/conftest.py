import os
import tempfile
import pytest
import sys
from flask import current_app
from flask_login import LoginManager
sys.path.append(os.getcwd())

from habit_app import database, create_app, auth as auth_module

with open(os.path.join(os.path.dirname(__file__), 'test_data.sql'), 'rb') as f:
    _test_data_sql = f.read().decode("utf8")


@pytest.fixture
def app():
    """Create a new app instance for each test."""
    db_fd, db_path = tempfile.mkstemp()
    app = create_app({"TESTING": True, "DATABASE": db_path})

    with app.app_context():
        database.init_db()
        database.get_db().executescript(_test_data_sql)
        auth_module.login_manager.init_app(app)

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

    def login(self, username='saved_test_user', password='saved_test_password'):
        return self._client.post(
            "/auth/login", data={'username': username, 'password': password}
        )

    def logout(self):
        return self._client.get('/auth/logout')


@pytest.fixture
def auth(client):
    return AuthActions(client)
