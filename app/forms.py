from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, EqualTo, Length

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')


class CreateAccountForm(FlaskForm):
    username=StringField('Username', validators=[DataRequired(),
                                                 Length(3,25, message='Username must be between 3 and 25 characters')])
    password = PasswordField('Password', validators=[DataRequired(),
                                                     EqualTo('confirm', message='Passwords must match.')])
    confirm = PasswordField('Confirm Password')
    submit = SubmitField('Create Account')

