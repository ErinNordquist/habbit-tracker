#from database import get_db
import database
from flask import request,jsonify, Response
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from flask_restful import Resource


class CreateAccount(Resource):  # /auth/create-account
    def post(self):
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        error = None
        db = database.get_db()

        # check if username already exists
        if db.execute("SELECT username from user WHERE username = (?)", (username,)).fetchone() is not None:
            error = "Username is taken."

        if error is None:
            db.execute("INSERT INTO USER(username) values (?)", (username,))
            db.commit()
            db.execute("INSERT INTO PASSWORD(username, password_hash) values(?,?)",
                        (username, generate_password_hash(password, "sha256")))
            db.commit()
            print('account created for', username)
            response = {}, 204
        else:
            response = {"error": 'Username is taken'}, 403

        return response


class Login(Resource):
    def post(self):  # /auth/login
        db = database.get_db()
        username = request.json.get("username",None)
        password = request.json.get("password",None)

        db = database.get_db()
        if db.execute("SELECT EXISTS(SELECT 1 from PASSWORD where username = (?))", (username,)).fetchone()[0] == 1:
            saved_pass_hash = \
                db.execute("SELECT password_hash from PASSWORD where username = (?)", (username,)).fetchone()[0]
            # Us = load_user(form.username.data)
            if check_password_hash(saved_pass_hash, password):
                access_token = create_access_token(identity = username)
                print(access_token)
                return {"access_token": access_token}, 200
            else:
                error = "Wrong username/password combination"
        else:
            error = "Wrong username"

        if error is not None:
            print(error)
            return {"error": error}, 200


# class Logout(Resource):
#     @jwt_required()
#     def post(self):#/auth/logout
#         """log the user out"""
#         return