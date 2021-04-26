from flask import render_template, flash, redirect, Blueprint, session, url_for, request
#from habit_app import app
from flask import g

from habit_app.database import query_db, execute_sql
from habit_app.forms import CreateHabitForm
bp = Blueprint("routes", __name__)


@bp.route('/')
@bp.route('/index')
def index():
    #print(session)
    if 'username' not in session:
        user = {'username':'Stranger'}
    else:
        user = {'username':session['username']}
        #print(user)
        #return render_template('habits.html')
    return render_template('index.html', title = 'Home', user = user)

@bp.route('/home')
def home():
    if 'username' not in session:
        flash('No user signed in.')
        return redirect(url_for('auth.login'))

@bp.route('/create-habit')
def create_habit():
    if 'username' not in session:
        flash('No user signed in.')
        return redirect(url_for('auth.login'))

    form = CreateHabitForm()
    if request.method == 'POST':
        return render_template('create-habit.html')
    else:
         return render_template('create-habit.html', form=form)





