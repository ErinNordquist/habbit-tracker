import database
from flask import request,jsonify, Response, json
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import pandas as pd

from flask_restful import Resource


class UpdateHabitActions(Resource): #/update/<string:habit_id>-<string:habit_action>'
    @jwt_required()
    def post(self, habit_id, habit_action):
        db = database.get_db()
        #update db
        sql = "INSERT INTO HABIT_ACTION(username,habit_id, action_dttm) values (?,?,?)"

        db.execute(sql, (get_jwt_identity(),habit_id,habit_action))
        db.commit()

        return 200

    @jwt_required()
    def delete(self, habit_id, habit_action):
        """to remove a habit action"""
        db = database.get_db()
        # update db
        sql = "DELETE FROM HABIT_ACTION WHERE username = (?) and habit_id = (?) and action_dttm = (?)"

        db.execute(sql, (get_jwt_identity(), habit_id, habit_action))
        db.commit()

        return 200
