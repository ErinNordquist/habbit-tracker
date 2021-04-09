from flask import render_template, flash, redirect
from app import app
from app.forms import LoginForm, CreateAccountForm
from database import query_db, execute_sql


@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Stranger'}
    return render_template('index.html', title = 'Home', user = user)

@app.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():

        flash('Login requested for user {}, remember me={}'.format(
            form.username.data, form.remember_me.data
        ))
        return redirect('/index')
    return render_template('login.html',title='Login', form = form)

@app.route('/create-account', methods=['GET','POST'])
def create_account():
    form = CreateAccountForm()
    if form.validate_on_submit():
        execute_sql("INSERT INTO USER(username) values (?)", (form.username.data,))
        user_id = query_db("SELECT user_id from USER where username = ?", (form.username.data,), one=True)
        print(user_id)
        execute_sql("INSERT INTO PASSWORD(user_id, password_hash) values(?,?)",(user_id,form.password.data))
        return redirect('/index')
    return render_template('create_account.html',title = 'Create Account',form=form)
