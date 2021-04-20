from flask import render_template, flash, redirect, Blueprint
#from habit_app import app
from flask import g

from habit_app.database import query_db, execute_sql
bp = Blueprint("routes", __name__)


@bp.route('/')
@bp.route('/index')
def index():
    user = {'username': 'Stranger'}
    return render_template('index.html', title = 'Home', user = user)



