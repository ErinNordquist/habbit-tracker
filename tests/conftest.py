import os
import tempfile
import pytest
import sys
from flask import current_app
sys.path.append(os.getcwd())

from habit_app import database, create_app


@pytest.fixture
def app():
    """Create a new app instance for each test."""
    db_fd, db_path = tempfile.mkstemp()
    app = create_app({"TESTING":True, "DATABASE":db_path})

    with app.app_context():
        database.init_db()

    yield app

    #teardown
    os.close(db_fd)
    os.unlink(db_path)

@pytest.fixture
def client(app):
    """Create a client to use during tests"""
    return app.test_client()

