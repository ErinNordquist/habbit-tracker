import sqlite3
from flask import current_app
from flask import g
#from habit_app import app


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        #print(g)
        db = g._database = sqlite3.connect(current_app.config['DATABASE'])
    return db

def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    result = cur.fetchall()
    cur.close()
    return (result[0] if result else None) if one else result

def execute_sql(sql, args=()):
    db = get_db()
    db.cursor().execute(sql,args)
    db.commit()


def init_db():
    db = get_db()
    with current_app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
        #print(db)
    db.commit()

def init_app(app):
    app.teardown_appcontext(close_connection)
    init_db()