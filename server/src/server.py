from flask import Flask, request, Response
from flask_cors import CORS
from uuid import uuid4
from json import dumps
import sqlite3
import os
from hashlib import pbkdf2_hmac

app = Flask(__name__)
CORS(app)

DATABASE = 'data.db'

# Execute a sqlite3 command
def db_query(query, args=(), one=False):
    con = sqlite3.connect(DATABASE)
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    res = cur.execute(query, args).fetchall()
    con.commit()
    con.close()
    # return res
    return (res[0] if res else None) if one else [dict(zip(row.keys(), row)) for row in res]

# Initialize database
def db_init():
    db_query("CREATE TABLE IF NOT EXISTS users (email text, hashid text, salt text)")
    db_query("CREATE TABLE IF NOT EXISTS vault (id text, email text, name text, username text, password text, iv text)")

# Checks if the auth_hash is valid for the account
def user_authenticate(email, auth_hash):
    db_response = db_query("SELECT * FROM users WHERE email = (?)", (email, ), True)
    if db_response is None:
        return False

    salt = bytes.fromhex(db_response['salt'])
    hashid = pbkdf2_hmac('sha256', auth_hash.encode(), salt, 100000).hex()

    if hashid != db_response['hashid']:
        return False

    return True


@app.route("/register", methods=['POST'])
def user_register():
    email = request.get_json()['email']
    auth_hash = request.get_json()['authHash']

    # If user already exists, return an error
    db_response = db_query("SELECT * FROM users WHERE email = (?)", (email, ), True)
    if (db_response):
        return Response(dumps({"error": "Email is already registered"}), status=409, mimetype="application/json")
    salt = os.urandom(32)

    hashid = pbkdf2_hmac('sha256', auth_hash.encode(), salt, 100000).hex() 
    db_query("INSERT INTO users VALUES (?, ?, ?)", (email, hashid, salt.hex()))
    return dumps({})

@app.route("/login", methods=['POST'])
def user_login():
    email = request.get_json()['email']
    auth_hash = request.get_json()['authHash']

    if not user_authenticate(email, auth_hash):
        return Response(dumps({"error": "Email or password is invalid"}), status=401, mimetype="application/json")

    user_vault = db_query("SELECT * FROM vault WHERE email = (?)", (email,))
    return dumps(user_vault)


@app.route("/vault", methods=['POST'])
def vault_insert():
    # Authenticate user with their authHash
    email = request.get_json()['email']
    auth_hash = request.get_json()['authHash']
    name = request.get_json()['name']
    username = request.get_json()['username']
    encrypted_password = request.get_json()['password']
    iv = request.get_json()['iv']

    if not user_authenticate(email, auth_hash):
        return Response(dumps({"error": "Email or password is invalid"}), status=401, mimetype="application/json")

    newid = str(uuid4())
    db_query("INSERT INTO vault VALUES (?, ?, ?, ?, ?, ?)", (newid, email, name, username, encrypted_password, iv))
    return dumps({})


if __name__ == "__main__":
    db_init()
    app.run(debug=True)
