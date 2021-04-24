import os
import tempfile
import pytest
import sys
from flask import session, g
sys.path.append(os.getcwd())

from habit_app import database, create_app


def test_root(client):
    assert client.get("/").status_code == 200


def test_create_user_successful(client, app):
    assert client.get("/auth/create-account").status_code == 200
    response = client.post("/auth/create-account", data={"username":"test_user", "password":"test_password"})
    #(response.status_code)
    print(response.headers['Location'])
    assert "http://localhost/auth/login" == response.headers['Location']

    with app.app_context():
        assert (
                database.get_db().execute("select * from USER where username = 'test_user'").fetchone()
                is not None
        )
        assert(
            database.get_db().execute("select * from PASSWORD where username = 'test_user'").fetchone() is not None
        )


def test_create_user_username_not_available(client, app):
    assert client.get("/auth/create-account").status_code == 200
    response = client.post("/auth/create-account", data={"username":"saved_test_user", "password":"test_password"})
    #(response.status_code)
    assert "http://localhost/auth/create-account" == response.headers['Location']

    with app.app_context():
        assert (
                database.get_db().execute("select count(*) from USER where username = 'saved_test_user'").fetchone()[0] == 1
        )


def test_login_successful(client, auth):
    assert client.get("/auth/login").status_code == 200
    response = auth.login(username="saved_test_user", password="saved_test_password")
    assert response.status_code == 302 # redirect code
    assert "http://localhost/index" == response.headers['Location']


def test_login_fail_password(client, auth):
    assert client.get("/auth/login").status_code == 200
    response = auth.login(username="saved_test_user", password="saved_test_passw654rord")
    assert response.status_code == 302
    assert "http://localhost/auth/login" == response.headers['Location']


def test_login_fail_username(client, auth):
    assert client.get("/auth/login").status_code == 200
    response = auth.login(username="saved_tser", password="saved_test_password")
    assert response.status_code == 302
    assert "http://localhost/auth/login" == response.headers['Location']


def test_logout(client, auth, app):
    with client:
        auth.login()
        print(session)
        assert "username" in session
        response = auth.logout()
        assert response.status_code == 302
        assert "http://localhost/index" == response.headers['Location']
        print(session)
        assert "username" not in session




