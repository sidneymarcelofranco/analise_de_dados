from flask import Blueprint,render_template,request,redirect,url_for,flash
from flask_login import login_user,logout_user,login_required
from .models import User
from werkzeug.security import generate_password_hash,check_password_hash
from . import db
pages = Blueprint('pages',__name__,template_folder='templates',
    static_folder='static',)
    
# authentication 

@pages.route('/pages/authentication/signin')
@login_required
def auth_signin():
    return render_template('pages/authentication/auth-signin.html')

@pages.route('/pages/authentication/signup')
@login_required
def auth_signup():
    return render_template('pages/authentication/auth-signup.html')

@pages.route('/pages/authentication/password_reset')
@login_required
def auth_password_reset():
    return render_template('pages/authentication/auth-pass-reset.html')

@pages.route('/pages/authentication/password_create')
@login_required
def auth_password_create():
    return render_template('pages/authentication/auth-pass-change.html')

@pages.route('/pages/authentication/lockscreen')
@login_required
def auth_lockscreen():
    return render_template('pages/authentication/auth-lockscreen.html')

@pages.route('/pages/authentication/logout')
@login_required
def auth_logout():
    return render_template('pages/authentication/auth-logout.html')

@pages.route('/pages/authentication/success_message')
@login_required
def auth_success_message():
    return render_template('pages/authentication/auth-success-msg.html')

@pages.route('/pages/authentication/two_step')
@login_required
def auth_two_step():
    return render_template('pages/authentication/auth-twostep.html')

# errors 

@pages.route('/pages/authentication/errors/404error')
@login_required
def errors_404():
    return render_template('pages/authentication/errors/auth-404.html')

@pages.route('/pages/authentication/errors/500error')
@login_required
def errors_500():
    return render_template('pages/authentication/errors/auth-500.html')

@pages.route('/pages/authentication/errors/503error')
@login_required
def errors_503():
    return render_template('pages/authentication/errors/auth-503.html')

@pages.route('/pages/authentication/errors/offline')
@login_required
def errors_offline():
    return render_template('pages/authentication/errors/auth-offline.html')


# pages

@pages.route('/pages/starter')
@login_required
def pages_starter():
    return render_template('pages/pages-starter.html')



@pages.route('/pages/maintenance')
@login_required
def pages_maintenance():
    return render_template('pages/pages-maintenance.html')

@pages.route('/pages/coming_soon')
@login_required
def pages_coming_soon():
    return render_template('pages/pages-coming-soon.html')


# authentication working

@pages.route('/account/login')
def login():
    return render_template('pages/account/login.html')

@pages.route('/account/login',methods=['POST'])  
def login_post():
    if request.method == 'POST':
        username = request.form.get('username') 
        password = request.form.get('password')
        remember = True if request.form.get('remember') else False

        user = User.query.filter_by(username=username).first()

        if not user or not check_password_hash(user.password,password):
            flash("Invalid Credentials")
            return redirect(url_for('pages.login'))

        login_user(user, remember=remember)
    return redirect(url_for('dashboards.index'))
  

@pages.route('/account/signup')  
def signup(): 
    return render_template('pages/account/signup.html')


@pages.route('/account/signup',methods=['POST'])  
def signup_post():
    email = request.form.get('email') 
    username = request.form.get('username')
    password = request.form.get('password')

    user_email = User.query.filter_by(email=email).first()
    user_username = User.query.filter_by(username=username).first()    
    
    if user_email:
        flash("User email already Exists")
        return redirect(url_for('pages.signup'))
    if user_username:    
        flash("Username already Exists")
        return redirect(url_for('pages.signup'))

    new_user = User(email=email,username=username,password=generate_password_hash(password,method="sha256"))
    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('pages.login'))


@pages.route('/account/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('pages.login'))