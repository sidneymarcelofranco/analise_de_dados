from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'thisisasecretkey'
    app.secret_key = 'thisisasecretkey'
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqllite'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # LoginManager is needed for our application
    # to be able to log in and out users
    login_manager = LoginManager(app)
    login_manager.login_view = 'pages.login'
    
    db.init_app(app)
    # Create database within app context
    from .models import User
    with app.app_context():
        db.create_all()
        
    # Creates a user loader callback that returns the user object given an id
    @login_manager.user_loader
    def loader_user(user_id):
        return User.query.get(int(user_id)) 
    
    from .dashboards import dashboards
    from .layouts import layouts
    from .pages import pages
 

    app.register_blueprint(dashboards ,url_prefix="/")
    app.register_blueprint(layouts ,url_prefix="/")
    app.register_blueprint(pages ,url_prefix="/")
    
    return app