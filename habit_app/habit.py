from flask import render_template, flash, redirect, Blueprint, session, url_for, request
from flask_login import login_required, current_user

from habit_app.database import query_db, execute_sql, add_habit, get_habits
from habit_app.forms import CreateHabitForm

bp = Blueprint("habit", __name__)

@bp.route('/home')
@login_required
def home():
    habit_list = get_habits(current_user.username)
    print(habit_list)
    return render_template('home.html', habit_list = habit_list)

@bp.route('/create-habit', methods =['GET','POST'])
@login_required
def create_habit():
    form = CreateHabitForm()
    if request.method == 'POST':
        # Save new habit to database
        add_habit(form.habit_title.data, current_user.username)
        return redirect(url_for('habit.home'))
    else:
        return render_template('create-habit.html', form=form)