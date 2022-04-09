from flask import Flask, request, Response
from flask_cors import CORS
from json import dumps
import sqlite3
import os
from hashlib import pbkdf2_hmac

app = Flask(__name__)
CORS(app)

DATABASE = 'data.db'

def query_db(query, args=(), one=False):
    con = sqlite3.connect(DATABASE)
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    res = cur.execute(query, args).fetchall()
    con.commit()
    con.close()
    # return res
    return (res[0] if res else None) if one else [dict(zip(row.keys(), row)) for row in res]

def init_db():
    query_db("CREATE TABLE IF NOT EXISTS users (email text, hashId text, salt text)")

@app.route("/register", methods=['POST'])
def user_register():
    email = request.get_json()['email']
    auth_hash = request.get_json()['authHash']
    salt = os.urandom(32)
    hashId = pbkdf2_hmac('sha256', auth_hash.encode(), salt, 100000).hex() 
    print(hashId)


    query_db("INSERT INTO users VALUES (?, ?, ?)", (email, hashId, salt.hex()))
    return "Hello COMP6841! :)"

@app.route("/login", methods=['POST'])
def user_login():
    email = request.get_json()['email']
    auth_hash = request.get_json()['authHash']
    try:
        db_response = query_db("SELECT * FROM users WHERE email = (?)", (email, ), True)
        # salt = bytes.fromhex(query_db("SELECT * FROM users WHERE email = (?) LIMIT 1", (email, ))[0]['salt'])
        salt = bytes.fromhex(db_response['salt'])
        hash_id = pbkdf2_hmac('sha256', auth_hash.encode(), salt, 100000).hex()
        # print(hash_id)
        # print(db_response['hashId'])
        return "The user's vault"
    except:
        return Response(dumps({"error": "Email or password is invalid"}), status=401, mimetype="application/json")

@app.route("/get", methods=['GET'])
def test():
    a = query_db("SELECT * FROM users")
    return dumps(a)

# @app.route("/")

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
