from http import client
from flask import Flask,  jsonify, request
import pymongo

app= Flask(__name__)
client = pymongo.MongoClient("mongodb+srv://caelanliu:461mongo@cluster0.txm6jf5.mongodb.net/?retryWrites=true&w=majority")
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