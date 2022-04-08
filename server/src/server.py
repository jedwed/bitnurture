from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/register", methods=['POST'])
def user_register():
    print(request.get_json())
    return "Hello COMP6841! :)"

@app.route("/login", methods=['POST'])
def user_login():
    return "Yes"

# @app.route("/")

# @app.route("/")

if __name__ == "__main__":
    app.run()
