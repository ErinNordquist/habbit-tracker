import os
import tempfile
import pytest
import sys
from flask import current_app
sys.path.append(os.getcwd())

from habit_app import database, create_app


def test_root(client):
    assert client.get("/").status_code == 200

def test_create_user(client, app):
    assert client.get("/auth/create-account").status_code == 200
    response = client.post("/auth/create-account", data={"username":"test_user", "password":"test_password"})
    #(response.status_code)
    #assert "login" == response.headers['Location'].split('/')[-1]

    with app.app_context():
        assert (
                database.get_db().execute("select * from USER where username = 'test_user'").fetchone()
                is not None
        )

