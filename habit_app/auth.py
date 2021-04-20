import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
from habit_app.database import execute_sql, query_db, get_db
from habit_app.forms import LoginForm, CreateAccountForm

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/create-account', methods=['GET','POST'])
def create_account():
    form = CreateAccountForm()
    if request.method == 'POST':
        db = get_db()
        db.cursor().execute("INSERT INTO USER(username) values (?)", (form.username.data,))
        db.commit()
        user_id = query_db("SELECT user_id from USER where username = ?", (form.username.data,), one=True)
        print(user_id)
        execute_sql("INSERT INTO PASSWORD(user_id, password_hash) values(?,?)", (user_id[0], form.password.data))
        return redirect('/routes/index')
    return render_template('create_account.html', title='Create Account', form=form)

@bp.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm()
    if request.method == 'POST':

        flash('Login requested for user {}, remember me={}'.format(
            form.username.data, form.remember_me.data
        ))
        return redirect('/routes/index')
    return render_template('login.html',title='Login', form = form)
