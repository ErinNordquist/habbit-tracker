import os
import tempfile
import pytest
import sys
from flask import current_app
sys.path.append(os.getcwd())

from habit_app import database, create_app

with open(os.path.join(os.path.dirname(__file__),'test_data.sql'), 'rb') as f:
    _test_data_sql = f.read().decode("utf8")

@pytest.fixture
def app():
    """Create a new app instance for each test."""
    db_fd, db_path = tempfile.mkstemp()
    app = create_app({"TESTING":True, "DATABASE":db_path})

    with app.app_context():
        database.init_db()
        database.get_db().executescript(_test_data_sql)

    yield app

    #teardown
    os.close(db_fd)
    os.unlink(db_path)

@pytest.fixture
def client(app):
    """Create a client to use during tests"""
    return app.test_client()

