from database import get_db
from flask import request,jsonify, Response
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from flask_restful import Resource





class CreateAccount(Resource):#/auth/create-account
    def post(self):
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        response = Response()
        if request.method == 'POST':
            error = None
            db = get_db()
            print(request.data)
            # check if username already exists
            if db.execute("SELECT username from user WHERE username = (?)", (username,)).fetchone() is not None:
                error = "Username is taken."

            if error is None:
                db.execute("INSERT INTO USER(username) values (?)", (username,))
                db.commit()
                db.execute("INSERT INTO PASSWORD(username, password_hash) values(?,?)",
                            (username, generate_password_hash(password, "sha256")))
                print('account created')
                response = {}, 200
            else:
                response = {error: 'username is taken'}, 403
        else:
            print(request)
            response = {}, 200
        return response


class Login(Resource):
    def post(self): #/auth/login
        db = get_db()
        username = request.json.get("username",None)
        password = request.json.get("password",None)
        if request.method == 'POST':
            db = get_db()
            if db.execute("SELECT EXISTS(SELECT 1 from PASSWORD where username = (?))", (username,)).fetchone()[0] == 1:
                saved_pass_hash= db.execute("SELECT password_hash from PASSWORD where username = (?)", (username,)).fetchone()[0]
                #Us = load_user(form.username.data)
                if check_password_hash(saved_pass_hash, password):
                    access_token = create_access_token(identity = username)

                    return jsonify(access_token=access_token)
                else:
                    error = "Wrong username/password combination"
            else:
                error = "Wrong username"

        if error is not None:

            return jsonify(error=error)


class Logout(Resource):
    def post(self):#/auth/logout
        """log the user out"""
        return