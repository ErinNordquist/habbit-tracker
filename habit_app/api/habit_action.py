import database
from flask import request,jsonify, Response, json
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import datetime
import pandas as pd

from flask_restful import Resource

#def get_habit_actions_helper(db, username, habit_id):
def is_date_invalid(date_str):
    """Helper function to determine if passed in string is a valid date in format %Y-%m-%d"""
    return pd.to_datetime(date_str, errors='coerce', format='%Y-%m-%d') is pd.NaT


class UpdateHabitActions(Resource): #/update/<string:habit_id>&<string:habit_action>'
    @jwt_required()
    def post(self, habit_id, habit_action):
        # TODO: Check if action already exists, if so, return 409
        # TODO: Check habit_id exists before insertion, if not found, return 404
        if is_date_invalid(habit_action):
            return {'msg': 'habit_action must have format YYYY-MM-DD and be a valid date'}, 400
        db = database.get_db()
        #check for existence
        #update db
        sql = "INSERT INTO HABIT_ACTION(username,habit_id, action_dt) values (?,?,?)"

        db.execute(sql, (get_jwt_identity(), habit_id, habit_action))
        db.commit()
        return {}, 204

    @jwt_required()
    def delete(self, habit_id, habit_action):
        """to remove a habit action"""
        # TODO: Check if action exists, if not return 404
        if is_date_invalid(habit_action):
            return {'msg': 'habit_action must have format YYYY-MM-DD and be a valid date'}, 400
        db = database.get_db()

        # update db
        sql = "DELETE FROM HABIT_ACTION WHERE username = (?) and habit_id = (?) and action_dt = (?)"

        db.execute(sql, (get_jwt_identity(), habit_id, habit_action))
        db.commit()

        return {}, 204
