from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from json import dumps

app = Flask(__name__)
CORS(app)

DATABASE = 'data.db'

def query_db(query, args=()):
    con = sqlite3.connect(DATABASE)
    cur = con.cursor()
    res = cur.execute(query, args).fetchall()
    con.commit()
    con.close()
    return res

def init_db():
    query_db("CREATE TABLE IF NOT EXISTS users (email text, auth_hash text)")

@app.route("/register", methods=['POST'])
def user_register():
    email = request.get_json()['email']
    auth_hash = request.get_json()['authHash'] 
    query_db("INSERT INTO users VALUES (?, ?)", (email, auth_hash))
    a = query_db("SELECT * FROM users")
    print(dumps(a))
    return "Hello COMP6841! :)"

@app.route("/login", methods=['POST'])
def user_login():
    return "Yes"

# @app.route("/")

# @app.route("/")

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
