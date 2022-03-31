from flask import Flask

app = Flask(__name__)

@app.route("/register")
def user_register():
    return "Hello COMP6841! :)"

if __name__ == "__main__":
    app.run()
