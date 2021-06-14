import database
from flask import request,jsonify, Response, json
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import pandas as pd

from flask_restful import Resource


def get_habit_title_helper(db):
    """
    Get habit titles and ids for current user
    :return:
    """
    sql = """SELECT habit_id, title FROM habit WHERE username = (?)"""
    return db.execute(sql, (get_jwt_identity(),)).fetchall()


def get_habits_helper(db, start_date, end_date):
    """
    This is a helper function for get functions in the below classes. It allows them to request habit
    actions from within the passed in date range.
    Parameters
        start_date: str; represents the first date (inclusive) in search range
        end_date: str; represents the last date (inclusive) in search range
    """
    sql = f"""SELECT * FROM habit_action 
    WHERE username = (?) AND action_dttm BETWEEN DATE('{start_date}') AND DATE('{end_date}')"""
    return db.execute(sql, (get_jwt_identity(),)).fetchall()


class GetHabits(Resource): #/home
    @jwt_required()
    def get(self):
        db = database.get_db()
        habit_titles = get_habit_title_helper(db)
        habit_titles_df = pd.DataFrame(habit_titles, columns=['habit_id', 'habit_title'])

        habit_actions = get_habits_helper(db, '2021-06-12', '2021-06-19')
        habit_actions_df = pd.DataFrame(habit_actions, columns=['username','habit_id','habit_action'])
        habit_data_df = habit_titles_df.merge(habit_actions_df, on='habit_id')

        habit_data_df = habit_data_df.groupby(['habit_id', 'habit_title'])['habit_action'].apply(list).reset_index(drop=False)

        habit_resp = {'habit_data': habit_data_df.to_dict(orient='records')}
        print(habit_resp)
        return habit_resp, 200


class UpdateHabitActions(Resource): #/update
    @jwt_required()
    def post(self):
        print('update received')
        db = database.get_db()
        print(request)
        return 200

# class GetHabitActions(Resource): # /get-habit-actions ?
#     """
#     This Class is for fetching data primarily.
#     """
#     @jwt_required()
#     def get(self):
#         #fetch habit actions from db
#         #configure into proper json format
#         #respond
