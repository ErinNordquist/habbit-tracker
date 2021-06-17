import sqlite3
import pytest
from habit_app.api import database

def test_get_close_db(app):
    with app.app_context():
        db = database.get_db()
        assert db is database.get_db()

    with pytest.raises(sqlite3.ProgrammingError) as e:
        db.execute("SELECT 1")

    assert "closed" in str(e.value)
