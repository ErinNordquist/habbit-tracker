import pytest
from habit_app.api import database
from flask_jwt_extended import get_jwt_identity


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
            assert response.status_code == 201

            current_habits = database.get_db().execute("SELECT title FROM HABIT WHERE username = (?)",(username,)).fetchall()

            current_habits = [x[0] for x in current_habits]
            #print(h, response.json)
            assert(h in current_habits)
            assert 'habit_id' in response.json
            assert 'habit_title' in response.json
            assert response.json['habit_title'] == h



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

@pytest.mark.parametrize(
    ('user', 'password', 'expected_data', 'start_date', 'end_date', 'status'),
    (
        ('www', 'xxx',
         [{'habit_id':1, 'habit_title':'placeholder habit 1', 'habit_action': ['']},
          {'habit_id':2, 'habit_title':'placeholder habit 2', 'habit_action': ['']},
          {'habit_id': 4, 'habit_title': 'placeholder habit 3', 'habit_action': ['']}]
        , '2020-01-10', '2020-01-18', 200),
        ('www', 'xxx',
         [{'habit_id': 1, 'habit_title': 'placeholder habit 1', 'habit_action': ['2021-06-12', '2021-06-13']},
          {'habit_id': 2, 'habit_title': 'placeholder habit 2', 'habit_action': ['2021-06-13']},
          {'habit_id': 4, 'habit_title': 'placeholder habit 3', 'habit_action': ['']}],
         '2021-06-12', '2021-06-19', 200),
        ('zzz', 'aaa',
         [{'habit_id': 3, 'habit_title': 'habit 1', 'habit_action': ['2021-06-16']}],
         '2021-06-12', '2021-06-19',200),
    )
)
def test_get_habits(client, auth, user, password, expected_data, start_date, end_date, status):
    with client:
        auth.login(username = user, password = password)
        response = client.get(f"home/{start_date}&{end_date}", headers={'Authorization': 'Bearer ' + auth.access_token})
        assert response.status_code == status
        assert expected_data == response.json['habit_data']
