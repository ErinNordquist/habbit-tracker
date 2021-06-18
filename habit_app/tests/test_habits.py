import pytest
from flask import session
from habit_app.api import database
from flask_jwt_extended import get_jwt_identity

#TODO: Test adding a habit (just starting to be impleneted)

@pytest.mark.parametrize(
    ('habit_titles', 'outcome'),
    (
        (["walk 5mi"], 'succeed'),
        (['sleep 8 hours','smile','brush teeth','smile'], 'succeed'),
    ),
)
def test_add_habit(client, auth, habit_titles, outcome):
    with client:
        auth.login()
        username = auth.user
        for h in habit_titles:
            #assert client.post('/add-habit').status_code == 200
            data ={'habit_title': h}
            response = client.post("/habit", json=data, headers={'Authorization':'Bearer '+auth.access_token})
            assert response.status_code == 200

            current_habits = database.get_db().execute("SELECT title FROM HABIT WHERE username = (?)",(username,)).fetchall()

            current_habits = [x[0] for x in current_habits]
            #print(h, response.json)
            assert(h in current_habits)
            assert 'habit_id' in response.json
            assert 'habit_title' in response.json
            assert response.json['habit_title'] == h


#TODO: test deleting a habit (not yet implemented)
@pytest.mark.parametrize(
    ('habit_title', 'habit_id', 'outcome'),
    (
        ("placeholder habit 1", 1, 'succeed'),

    ),
)
def test_delete_habit(client, auth, habit_title, habit_id, outcome):
    with client:
        auth.login()
        username = auth.user
        response = client.delete("/habit/"+str(habit_id), headers={'Authorization': 'Bearer ' + auth.access_token})
        assert response.status_code == 200
        db = database.get_db()
        sql = "SELECT title FROM HABIT WHERE habit_id = (?)"
        #print(db.execute(sql, (habit_id,)).fetchall())
        assert habit_title not in db.execute(sql, (habit_id,)).fetchall()

        sql = "SELECT username FROM HABIT_ACTION WHERE habit_id = (?)"
        # print(db.execute(sql, (habit_id,)).fetchall())
        assert username not in db.execute(sql, (habit_id,)).fetchall()
