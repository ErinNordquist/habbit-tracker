from flask import render_template, flash, redirect, Blueprint, session, url_for, request
#from habit_app import app
from flask import g
from flask_login import login_required

from habit_app.database import query_db, execute_sql, add_habit
from habit_app.forms import CreateHabitForm
bp = Blueprint("routes", __name__)


def check_signed_in():
    """helper function to check if a user is signed in on the current session"""
    if 'username' not in session:
        flash('No user signed in.')
        return redirect(url_for('auth.login'))

# def authenticated_resource(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         if 'username' in session:
#             return f(*args, **kwargs)
#
#         return redirect(url_for('auth.login'))
#
#     return decorated

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html', title = 'Home')

@bp.route('/home')
@login_required
def home():
    #check_signed_in()
    return render_template('home.html',habit_list = ['test1','test2'])

@bp.route('/create-habit', methods =['GET','POST'])
@login_required
def create_habit():
    #check_signed_in()

    form = CreateHabitForm()
    if request.method == 'POST':
        # Save new habit to database
        add_habit(form.title.data, session['username'])
        return render_template('home.html')
    else:
        return render_template('create-habit.html', form=form)





