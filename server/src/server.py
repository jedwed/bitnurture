from flask import Flask

app = Flask(__name__)

@app.route("/register", methods=['POST'])
def user_register():
    return "Hello COMP6841! :)"

@app.route("/login", methods=['POST'])
def user_login():
    return "Yes"

# @app.route("/")

# @app.route("/")

if __name__ == "__main__":
    app.run()
