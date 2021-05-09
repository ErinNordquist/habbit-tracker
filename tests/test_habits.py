import os
import sys
import pytest
from flask import session
from habit_app import database
from flask_login import current_user

#TODO: Test adding a habit (just starting to be impleneted)

@pytest.mark.parametrize(
    ('habit_titles','destination', 'outcome'),
    (
        (["walk 5mi"], 'http://localhost/home', 'succeed'),
        (['sleep 8 hours','smile','brush teeth'], 'http://localhost/home', 'succeed'),
    ),
)
def test_add_habit(client, auth, habit_titles, destination, outcome):
    with client:
        auth.login()
        username = session['_user_id']
        for h in habit_titles:
            assert client.get('/create-habit').status_code == 200
            data ={'habit_title': h}
            response = client.post("/create-habit", data=data)
            assert response.status_code == 302
            assert response.headers['Location'] == destination
            current_habits = database.get_db().execute("SELECT title FROM HABIT WHERE username = (?)",(username,)).fetchall()
            current_habits = [x[0] for x in current_habits]
            print(current_habits)
            assert(h in current_habits)


#TODO: test deleting a habit (not yet implemented)
