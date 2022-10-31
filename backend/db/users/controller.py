from http import client
from flask import Flask,  jsonify, request, render_template
import pymongo
import dotenv, os
from dotenv import load_dotenv

#initialize
load_dotenv()
app= Flask(__name__)
client = pymongo.MongoClient(os.getenv("MONGO_CLIENT_URL"))
db = client["EE461L"]

#crate collection
users = db["User"]
projects = db["Projects"]
hw = db["HWSet"]

@app.route("/users", methods = ["POST", "GET"])
def createUser():
    if request.method == "POST":
        message = ""
        json = request.get_json()
        user = json["userid"]
        user_found = users.find_one({"userid": user})
        if user_found:
            message = 'Userid already exists'
            return message

        ditem = {
            "userid" : json["userid"],
            "password" : json["password"],
            "username" :{
                "first": json["username"]["first"],
                "last" : json["username"]["last"]
            }
        }
        users.insert_one(ditem)
        
        return ditem["username"]

@app.route("/users", methods = ["POST"])
def createProject():
    json = request.get_json()
    authusers = [i for i in json["AuthorizedUsers"]]
    ditem = {
        "Name": json["Name"],
        "ID": json["ID"],
        "Description": json["Description"],
        "AuthorizedUsers": authusers
    }
    projects.insert_one(ditem)

@app.route("/users", methods = ["POST"])
def createProject():
    json = request.get_json()
    authusers = [i for i in json["AuthorizedUsers"]]
    ditem = {
        "Name": json["Name"],
        "ID": json["ID"],
        "Description": json["Description"],
        "AuthorizedUsers": authusers
    }
    projects.insert_one(ditem)

@app.route("/hwsets", methods = ["POST"])
def createHw():
    json = request.get_json()
    
    ditem = {
        "Name": json["Name"],
        "Capacity": json["Capacity"],
        "Availability": json["Availability"]
    }
    hw.insert_one(ditem)



if __name__ == "__main__":
    app.run(host='0.0.0.0',port=3100)
