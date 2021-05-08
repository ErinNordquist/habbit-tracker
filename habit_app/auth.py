import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from habit_app import login_manager
from habit_app.database import execute_sql, query_db, get_db
from habit_app.forms import LoginForm, CreateAccountForm
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user

bp = Blueprint('auth', __name__, url_prefix='/auth')


class User(UserMixin):
    def __init__(self, username, password_hash):
        self.username = username
        self.password_hash = password_hash
        self.authenticated = False
        self.id = username

    def is_authenticated(self):
        return self.authenticated

    def get_username(self): return self.username

    def get_id(self): return self.username


@login_manager.user_loader
def load_user(username):
    db = get_db()
    lu = db.execute("SELECT * FROM PASSWORD WHERE username = (?)", [username]).fetchone()
    if lu is None:
        return None
    else:
        return User(lu[0], lu[1])


@bp.route('/create-account', methods=['GET','POST'])
def create_account():
    form = CreateAccountForm()
    if request.method == 'POST':
        error = None
        db = get_db()

        #check if username already exists
        if db.execute("SELECT username from user WHERE username = (?)", (form.username.data,)).fetchone() is not None:
            error = "Username is taken."

        if error is None:
            db.execute("INSERT INTO USER(username) values (?)", (form.username.data,))
            db.commit()
            execute_sql("INSERT INTO PASSWORD(username, password_hash) values(?,?)",
                        (form.username.data, generate_password_hash(form.password.data, "sha256")))
            return redirect(url_for('auth.login'))
        else:
            flash(error)
            return redirect(url_for('auth.create_account'))
    return render_template('create_account.html', title='Create Account', form=form)

@bp.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm()
    error = None
    if current_user.is_authenticated:
        return redirect(url_for('habit.home'))
    if request.method == 'POST':
        db = get_db()
        if db.execute("SELECT EXISTS(SELECT 1 from PASSWORD where username = (?))", (form.username.data,)).fetchone()[0] == 1:
            #saved_pass_hash= db.execute("SELECT password_hash from PASSWORD where username = (?)", (form.username.data,)).fetchone()[0]
            Us = load_user(form.username.data)
            if Us is not None and check_password_hash(Us.password_hash, form.password.data):
                # redirect to home
                login_user(Us)
                print(current_user)
                return redirect(url_for('habit.home'))
            else:
                error = "Wrong username/password combination"
        else:
            error = "Wrong username"

    if error is not None:
        flash(error)
        return redirect(url_for('auth.login'))
    return render_template('login.html',title='Login', form = form)

@bp.route('/logout')
@login_required
def logout():
    """log the user out"""
    logout_user()
    print(session)
    return redirect(url_for('auth.login'))
