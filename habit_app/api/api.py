import os

from flask import Flask
from flask_restful import Resource, Api
from flask_jwt_extended import JWTManager
import database
#rom database import init_db, get_db
from flask_cors import CORS
app = Flask(__name__)
import sys
sys.path.append("database.py")

# initialize database
from flask import g
app.config["JWT_SECRET_KEY"] = "ralltope"
app.config["JWT_TOKEN_LOCATION"] = "headers"
app.config["JWT_COOKIE_SECURE"] = False
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_CSRF_IN_COOKIES'] = False
jwt = JWTManager(app)


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

database.init_db(app)
app.teardown_appcontext(close_connection)
api = Api(app)


class HelloWorld(Resource):
    def get(self, name):
        db = database.get_db()
        user = db.execute("SELECT username from user WHERE username = (?)", (name,)).fetchone()
        return {
            'user': user
        }

    def post(self, name):
        db = database.get_db()
        db.execute("INSERT INTO USER(username) values (?)", (name,))
        db.commit()
        return {'hello': 'world'}


from auth import CreateAccount, Login
from habit import GetHabits
api.add_resource(HelloWorld, '/<string:name>')
api.add_resource(CreateAccount, '/auth/create-account')
api.add_resource(Login, '/auth/login')
api.add_resource(GetHabits, '/home')
CORS(app, resources={r"/*": {"origins": "*"}})

#add starting data
with app.app_context():
    with open(os.path.join(os.path.dirname(__file__), 'start_data.sql'), 'rb') as f:
        _test_data_sql = f.read().decode("utf8")
    database.get_db().executescript(_test_data_sql)

if __name__=='__main__':
    app.run(debug=True)
