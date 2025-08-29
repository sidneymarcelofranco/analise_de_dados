from steex import create_app
from flask import redirect, url_for

app = create_app()

@app.route('/')
def home():
    return redirect(url_for('dashboards.index'))

if __name__ == '__main__':
    app.run()