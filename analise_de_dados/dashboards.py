from flask import Blueprint,render_template
# from flask_login import login_required


dashboards = Blueprint('dashboards',__name__,template_folder='templates',
    static_folder='static',)
    

@dashboards.route('/')
# @login_required
def index():
    return render_template('dashboards/index.html')


