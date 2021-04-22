import os
import tempfile
import pytest
import sys
from flask import current_app
sys.path.append(os.getcwd())

from habit_app import database, create_app


def test_root(client):
    assert client.get("/").status_code == 200

def test_create_user_successful(client, app):
    assert client.get("/auth/create-account").status_code == 200
    response = client.post("/auth/create-account", data={"username":"test_user", "password":"test_password"})
    #(response.status_code)
    assert "http://localhost/auth/login" == response.headers['Location']

    with app.app_context():
        assert (
                database.get_db().execute("select * from USER where username = 'test_user'").fetchone()
                is not None
        )
        assert(
            database.get_db().execute("select * from PASSWORD where username = 'test_user'").fetchone() is not None
        )

def test_login_successful(client, app):
    assert client.get("/auth/login").status_code == 200
    response = client.post("auth/login", data={"username":"saved_test_user", "password":"saved_test_password"})
    assert response.status_code == 302 # redirect code
    assert "http://localhost/index" == response.headers['Location']

def test_login_fail_password(client, app):
    assert client.get("/auth/login").status_code == 200
    response = client.post("auth/login", data={"username":"saved_test_user", "password":"saved_test_passw654rord"})
    assert response.status_code == 302
    assert "http://localhost/auth/login" == response.headers['Location']

def test_login_fail_username(client, app):
    assert client.get("/auth/login").status_code == 200
    response = client.post("auth/login", data={"username":"saved_tser", "password":"saved_test_password"})
    assert response.status_code == 302
    assert "http://localhost/auth/login" == response.headers['Location']



