import database
from flask import request,jsonify, Response, json
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import pandas as pd

from flask_restful import Resource

def check_habit_exists_helper(db, habit_id):
    """
    Check that a given habit id exists for current user
    :param db: database connection
    :param habit_id: integer representing a habit stored in the db
    :return: bool
    """
    return db.execute("SELECT EXISTS(SELECT 1 from HABIT where username = (?) and habit_id = (?))",
                    (get_jwt_identity(), habit_id)).fetchone()[0] == 1

def get_habit_title_helper(db):
    """
    Get habit titles and ids for current user
    :return:
    """
    sql = """SELECT habit_id, title FROM habit WHERE username = (?)"""
    return db.execute(sql, (get_jwt_identity(),)).fetchall()


def get_habits_helper(db):
    """
    This is a helper function for get functions in the below classes. It allows them to request habit
    actions from within the passed in date range.
    Parameters
        start_date: str; represents the first date (inclusive) in search range
        end_date: str; represents the last date (inclusive) in search range
    """
    sql = """SELECT habit.habit_id, title, action_dt 
              FROM habit LEFT OUTER JOIN (SELECT * FROM habit_action ) dated_actions 
                on habit.habit_id = dated_actions.habit_id
              WHERE habit.username = (?) 
           """
    return db.execute(sql, (get_jwt_identity(),)).fetchall()


class GetHabits(Resource): #/home
    @jwt_required()
    def get(self):
        #TODO: validate dates
        db = database.get_db()
        habit_data_df = get_habits_helper(db)
        print('pulled data:', habit_data_df)
        habit_data_df = pd.DataFrame(habit_data_df, columns=['habit_id', 'habit_title', 'habit_action']).fillna("")
        habit_data_df = habit_data_df.groupby(['habit_id', 'habit_title']
                                              )['habit_action'].apply(list).reset_index(drop=False)

        habit_resp = {'habit_data': habit_data_df.to_dict(orient='records')}
        print(habit_resp)
        return habit_resp, 200

    # @jwt_required()
    # def get(self, rows):
    #     db = database.get_db()
    #     habit_titles = get_habit_title_helper(db)
    #     habit_titles_df = pd.DataFrame(habit_titles, columns=['habit_id', 'habit_title'])
    #     habit_actions = pd.DataFrame(get_habits_helper_rows(db, rows),
    #                                  columns=['habit_id', 'habit_title', 'habit_action'])
    #     print('data:', habit_actions)
    #     return habit_actions, 200


class AddHabit(Resource): #/habit
    @jwt_required()
    def post(self):
        db = database.get_db()
        #title, username
        sql = "INSERT INTO HABIT (username, title) values (?,?)"
        db.execute(sql, (get_jwt_identity(), request.json.get('habit_title')))
        db.commit()
        habit_ids = db.execute("SELECT habit_id FROM HABIT WHERE username = (?) AND title = (?)",
                               (get_jwt_identity(), request.json.get('habit_title'))).fetchall()
        habit_ids = [x[0] for x in habit_ids]
        return {'habit_id': max(habit_ids), 'habit_title': request.json.get('habit_title')}, 201


class ModHabit(Resource):  # /habit/<int:habit_id>
    @jwt_required()
    def put(self, habit_id):
        """Used for updating title of a habit"""
        db = database.get_db()
        #check that we have a new title
        new_title = request.json.get('habit_title')
        if new_title is None:
            return {'msg': 'request must have a body with the argument "habit_title"'}, 400
        #check that habit exists - if not return 404
        if check_habit_exists_helper(db, habit_id) == False:
            return {}, 404
        else:
            sql = "UPDATE HABIT SET title = (?) WHERE username = (?) and habit_id = (?)"
            db.execute(sql, (new_title, get_jwt_identity(), habit_id))
            db.commit()
            return {}, 204



    @jwt_required()
    def delete(self, habit_id):
        #TODO: Check if habit exists, if not return 404
        db = database.get_db()
        sql = "DELETE FROM HABIT WHERE username = (?) and habit_id = (?)"
        db.execute(sql, (get_jwt_identity(), habit_id))
        sql = "DELETE FROM HABIT_ACTION WHERE username =(?) and habit_id = (?)"
        db.execute(sql, (get_jwt_identity(), habit_id))
        db.commit()

        return 200
