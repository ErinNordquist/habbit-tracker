from flask import render_template, flash, redirect, Blueprint, session, url_for, request
#from habit_app import app
from flask import g
from flask_login import login_required

from habit_app.database import query_db, execute_sql, add_habit
from habit_app.forms import CreateHabitForm
bp = Blueprint("routes", __name__)

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html', title = 'Welcome')







