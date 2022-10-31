import dotenv, os
import pymongo
from dotenv import load_dotenv
from app import app
from flask import Flask

#initialize
app = Flask(__name__, static_folder='./build', static_url_path='/')
load_dotenv()
client = pymongo.MongoClient(os.getenv("MONGO_CLIENT_URL"))
db = client["EE461L"]

#create collection
col_user = db["User"]
col_project = db["Project"]
col_hwset = db["HWSet"]

import user
import project
import hwset

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
