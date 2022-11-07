#if __name__ == '__main__':
#=======
import dotenv, os
import pymongo
from dotenv import load_dotenv
from flask import Flask,  jsonify, request, render_template
from backend.classes.HWSet import HWSet
import certifi

#initialize
app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')
load_dotenv()
client = pymongo.MongoClient(os.getenv("MONGO_CLIENT_URL"), tlsCAFile=certifi.where())
db = client["EE461L"]

#create collection
users = db["User"]
projects = db["Project"]
hwsets = db["HWSet"]

#create practice HWSets
hw1 = HWSet(100)
hw2 = HWSet(50)

@app.route('/')
def index():
    return app.send_static_file('index.html')
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route("/test", methods = ['POST', 'GET'])
def hw_pick():
    hw_id = request.form.get("hw_id")
    qty = request.form.get("qty")

    if request.method == 'POST':
        print(str(hw_id))
        print(str(qty))

    return {}.format(hw_id, qty, hw1.get_capacity())


@app.route("/check_in", methods=["POST", "GET"])
def checkIn_hardware():
    hw_id = request.form.get("hw_id")
    qty = request.form.get("qty")

    # Compute Input
    if qty == None:
        qty = hw1.get_availability()
    else:
        hw1.check_in(int(qty))

    return {}.format(hw_id, hw1.get_availability(), hw1.get_capacity())

@app.route("/check_out", methods=["POST", "GET"])
def checkOut_hardware():
    hw_id = request.form.get("hw_id")
    qty = request.form.get("qty")

    # Compute Input
    if qty == None:
        qty = hw1.get_availability()
    else:
        hw1.check_out(int(qty))

    return {}.format(hw_id, hw1.get_availability(), hw1.get_capacity())


@app.route("/join", methods=["POST", "GET"])
def joinProject():
    joined = request.form.get("join")
    if(joined == None):
        joined = "[insert name in field above]"
    else:
        print(joined)

    return {}.format(joined)


@app.route("/leave", methods=["POST", "GET"])
def leaveProject():
    left = request.form.get("leave")
    if(left == None):
        left = "[insert name in field above]"

    return {}.format(left)

#users
@app.route("/users", methods=["POST", "GET"])
def createUser():
    if request.method == "POST":
        json = request.get_json(force = True)
        message = ""
        json = request.get_json()
        user = json["userid"]
        user_found = users.find_one({"userid": user})
        if user_found:
            message = 'Userid already exists'
            return message

        ditem = {
            "userid": json["userid"],
            "password": json["password"],
            "username": {
                "first": json["username"]["first"],
                "last": json["username"]["last"]
            }
        }
        users.insert_one(ditem)

        return "User " + json["userid"] + " Created"

@app.route("/users/login", methods=["POST"])
def login():
    json = request.get_json(force = True)
    print(json)
    user = json['userid']
    password = json['password']
    user_found = users.find_one({"userid": user})
    if user_found is not None:
        #user exists
        if password == user_found["password"]:
            #correct password
            message = 'Correct password'
            return message
        else:
            #incorrect password
            message = 'Incorrect password'
            return message
    else:
        #user doesn't exist
        message = 'User does not exist'
        return message

#projects
@app.route("/projects", methods=["POST"])
def createProject():
    json = request.get_json(force = True)
    authusers = [i for i in json["AuthorizedUsers"]]
    ditem = {
        "Name": json["Name"],
        "ID": json["ID"],
        "Description": json["Description"],
        "AuthorizedUsers": authusers
    }
    projects.insert_one(ditem)
    return "Project " + json["Name"] + " Added"

@app.route("/projects/get", methods=["POST"])
def getProject():
    json = request.get_json(force = True)
    project_found = projects.find_one({"ID": json["projectId"]})
    if project_found:
        if(json["userId"] in project_found["AuthorizedUsers"]):
            return "Project Accessed"
        else:
            return "Access Denied"
    else:
        return "Project Does Not Exist"


#hwsets
@app.route("/hwsets", methods=["POST"])
def createHw():
    json = request.get_json(force = True)

    ditem = {
        "Name": json["Name"],
        "Capacity": json["Capacity"],
        "Availability": json["Availability"]
    }
    hwsets.insert_one(ditem)



if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))