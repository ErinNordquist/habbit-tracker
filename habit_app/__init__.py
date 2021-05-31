from flask import Flask, g
from config import Config
from flask_login import LoginManager
from flask_cors import CORS


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r'/.*': {'origins': '*'}})
    #if test_config is not None:



    from habit_app.database import init_db, init_app
    with app.app_context():
        #db = init_db()
        init_app(app)

    from habit_app import auth, routes, habit
    app.register_blueprint(routes.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(habit.bp)

    auth.login_manager.init_app(app)
    auth.login_manager.login_view = "auth.login"


    #from habit_app import routes
    return app

app = create_app()

login_manager = LoginManager()
#login_manager.init_app(app)
#login_manager.login_view = "auth.login"

#from habit_app.database import get_db


