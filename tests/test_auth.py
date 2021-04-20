import os
import tempfile
import pytest
import sys
from flask import current_app
sys.path.append(os.getcwd())

from habit_app import app
import database

@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()
    app = create_app("TESTING":True, "DATABASE":db_path)


@pytest.fixture
def client():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            database.init_app(current_app)
        yield client

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])

def test_create_user(client):
    assert client.get("/create-account").status_code == 200
    response = client.post("/create-account", data={"username":"test_user", "password":"test_password"})
    print(response.status_code)
    #assert "login" == response.headers['Location'].split('/')[-1]

    with app.test_client():
        with app.app_context():
            assert (
                database.get_db().execute("select * from USER where username = 'test_user'").fetchone()
                is not None
            )

