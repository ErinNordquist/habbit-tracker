import os
import pytest
import sys
from flask import session, jsonify, json

sys.path.append(os.getcwd())
import habit_app.api as api
from habit_app.api import database


def test_root(client):
    assert client.get("/a").status_code == 200


@pytest.mark.parametrize(
    ('username', 'password', 'destination', 'outcome'),
    (
            ('test_user', 'test_password', 'http://localhost/auth/login', 'succeed'),
            ('www', 'xxx', 'http://localhost/auth/create-account', 'fail'),
    ),
)
def test_create_user(client, app, username, password, destination, outcome):
    response = client.post("/auth/create-account", json={"username": username, "password": password})
    if outcome == 'succeed':
        assert response.status_code == 200
    else:
        assert response.status_code == 403
    # (response.status_code)
    # print(response.headers['Location'])
    #assert destination == response.headers['Location']

    with app.app_context():
        if outcome == 'succeed':
            assert (
                    api.database.get_db().execute("select * from USER where username = (?)", (username,)).fetchone()
                    is not None
            )
            assert (
                    api.database.get_db().execute("select * from PASSWORD where username = (?)",
                                              (username,)).fetchone() is not None
            )
        else:
            assert (
                    api.database.get_db().execute(
                        "select count(*) from USER where username = (?)", (username,)).fetchone()[0] == 1
            )


@pytest.mark.parametrize(
    ('username', 'password', 'status','body'),
    (
            ('www', 'xxx', 200, b'access_token'),
            ('saved_test_user', 'saved_test_passw654ord', 200, b'error'),
            ('saved_tser', 'saved_test_password',200, b'error'),
    ),
)
def test_login(client, auth, username, password, status, body):
    #ssert client.post("/auth/login").status_code == status
    response = auth.login(username=username, password=password)
    assert response.status_code == status  # redirect code
    assert body in response.data


# @pytest.mark.parametrize(
#     ('username', 'password', 'destination'),
#     (
#             ('saved_test_user', 'saved_test_password', 'http://localhost/auth/login'),
#     ),
# )
# def test_logout(client, auth, username, password, destination):
#     with client:
#         auth.login(username=username, password=password)
#         # print(session)
#         assert "_user_id" in session
#         response = auth.logout()
#         assert response.status_code == 302
#         assert destination == response.headers['Location']
#         # print(session)
#         assert "_user_id" not in session

# @pytest.mark.parametrize(
#     ('username', 'password', 'destination', 'outcome'),
#     (
#             ('test_user', 'test_password', 'http://localhost/auth/login', 'succeed'),
#             ('saved_test_user', 'test_password', 'http://localhost/auth/create-account', 'fail'),
#     ),
# )
# def test_CreateAccount(client, app, username, password, destination, outcome):
#     assert client.get("/auth/create-account").status_code == 200
#     response = client.post("/auth/create-account", data={"username": username, "password": password})
#     # (response.status_code)
#     # print(response.headers['Location'])
#     assert destination == response.headers['Location']
#
#     with app.app_context():
#         if outcome == 'succeed':
#             assert (
#                     api.database.get_db().execute("select * from USER where username = (?)", (username,)).fetchone()
#                     is not None
#             )
#             assert (
#                     api.database.get_db().execute("select * from PASSWORD where username = (?)",
#                                                   (username,)).fetchone() is not None
#             )
#         else:
#             assert (
#                     api.database.get_db().execute(
#                         "select count(*) from USER where username = (?)", (username,)).fetchone()[0] == 1
#             )

