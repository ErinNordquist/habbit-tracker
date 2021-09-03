import os
import sys
sys.path.append("database.py")
from flask import Flask
from flask_restful import Resource, Api
from flask_jwt_extended import JWTManager
import database
#rom database import init_db, get_db
from flask_cors import CORS
from flask import g


def create_app(config):
    app = Flask(__name__)

    jwt = JWTManager(app)
    #app.config.from_object(Config)
    for k,v in config.items():
        app.config[k] = v
    app.config["JWT_SECRET_KEY"] = "ralltope"
    app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
    app.config["JWT_COOKIE_SECURE"] = False
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    app.config['JWT_CSRF_IN_COOKIES'] = False

    database.init_db(app)

    @app.teardown_appcontext
    def close_connection(exception):
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()

    app.teardown_appcontext(close_connection)
    api = Api(app)

    class HelloWorld(Resource):
        def get(self, name):
            return {
                'user': 'Hello'
            }

    from auth import CreateAccount, Login
    from habit import GetHabits, AddHabit, ModHabit
    from habit_action import UpdateHabitActions
    api.add_resource(HelloWorld, '/<string:name>')
    api.add_resource(CreateAccount, '/auth/create-account')
    api.add_resource(Login, '/auth/login')
    api.add_resource(GetHabits, '/home')
    api.add_resource(AddHabit, '/habit')
    api.add_resource(ModHabit, '/habit/<int:habit_id>')
    api.add_resource(UpdateHabitActions, '/update/<string:habit_id>&<string:habit_action>')
    CORS(app, resources={r"/*": {"origins": "*"}})
    return app, api


app, api = create_app({
    'TESTING': False,
    'DATABASE': 'database.db'
})

#add starting data
with app.app_context():
    with open(os.path.join(os.path.dirname(__file__), 'start_data.sql'), 'rb') as f:
        _test_data_sql = f.read().decode("utf8")
    database.get_db().executescript(_test_data_sql)

if __name__=='__main__':
    app.run(debug=True)
