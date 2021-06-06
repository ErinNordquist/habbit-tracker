from flask import Flask
from flask_restful import Resource, Api
from flask_jwt_extended import JWTManager
from database import init_db, get_db
from flask_cors import CORS
app = Flask(__name__)

# initialize database
from flask import g
app.config["JWT_SECRET_KEY"] = "ralltope"
jwt = JWTManager(app)


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

init_db(app)
app.teardown_appcontext(close_connection)
api = Api(app)


class HelloWorld(Resource):
    def get(self, name):
        db = get_db()
        user = db.execute("SELECT username from user WHERE username = (?)", (name,)).fetchone()
        return {
            'user': user
        }


    def post(self, name):
        db = get_db()
        db.execute("INSERT INTO USER(username) values (?)", (name,))
        db.commit()
        return {'hello': 'world'}

from auth import CreateAccount, Login
from habit import getHabits
api.add_resource(HelloWorld, '/<string:name>')
api.add_resource(CreateAccount, '/auth/create-account')
api.add_resource(Login, '/auth/login')
api.add_resource(getHabits, '/home')
CORS(app, resources={r"/*": {"origins": "*"}})

if __name__=='__main__':
    app.run(debug=True)