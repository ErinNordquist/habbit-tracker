from flask import render_template, flash, redirect, Blueprint, session, url_for, request
from flask_login import login_required

from habit_app.database import query_db, execute_sql, add_habit
from habit_app.forms import CreateHabitForm

bp = Blueprint("habit", __name__)

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