import pytest
from habit_app.api import database

@pytest.mark.parametrize(
    ('habit_id', 'habit_action', 'status'),
    (
        (1, '2021-03-01', 204),
        (1, '2021-06-13', 409), #Conflict
        (1, '1111-22-22', 400), #Bad request
        (90,'2020-01-01', 404), #Not Found
    ),
)
def test_add_habit_action(client, auth, habit_id, habit_action, status):
    with client:
        auth.login()
        username = auth.user

        response = client.post(f'/update/{habit_id}&{habit_action}',
                               json={},
                               headers={'Authorization': 'Bearer '+auth.access_token})
        assert response.status_code == status

        current_habit_actions = database.get_db() \
            .execute("SELECT habit_id, action_dt FROM HABIT_ACTION WHERE username = (?) and habit_id = (?)",
                     (username, habit_id)).fetchall()

        #current_habit_ids = [x[0] for x in current_habit_actions]
        if status in [204, 409]:
            assert (habit_id, habit_action) in current_habit_actions
            assert len(set(current_habit_actions)) == len(current_habit_actions)

@pytest.mark.parametrize(
    ('habit_id','habit_action','status'),
    (
            (1, '2020-06-12', 204),
            (1, '2020-06-11', 404), #doesn't exist
            (1, '2020-66-12', 400), #bad request
            (3, '2021-06-16', 404), #wrong user
    )
)
def test_delete_habit_action(client, auth, habit_id, habit_action,status):
    with client:
        auth.login()
        response = client.delete(f'/update/{habit_id}&{habit_action}',
                                 headers={'Authorization': 'Bearer '+auth.access_token})
        assert response.status_code == status
        db = database.get_db()
        sql = "SELECT username, habit_id, action_dt FROM HABIT_ACTION WHERE username = (?) and habit_id = (?) and action_dt = (?)"
        db_result = db.execute(sql, (auth.user, habit_id, habit_action)).fetchall()

        if status < 300:
            assert (auth.user, habit_id, habit_action) not in db_result


