from http import client
from flask import Flask,  jsonify, request
import pymongo
import dotenv, os
from dotenv import load_dotenv

#initialize
load_dotenv()
app= Flask(__name__)
client = pymongo.MongoClient(os.getenv("MONGO_CLIENT_URL"))
db = client["EE461L"]

#crate collection
collection = db["User"]
collection2 = db["Projects"]

@app.route("/users", methods = ["POST"])
def createUser():
    json = request.get_json()
    ditem = {
        "username" : json["username"],
        "password" : json["password"],
    }
    collection.insert_one(ditem)
    return ditem["username"]

if __name__ == "__main__":
    app.run(port=3100, debug=True)