import dotenv, os
import pymongo
from dotenv import load_dotenv
from flask import Flask, jsonify, request, render_template
from backend.classes.HWSet import HWSet
import certifi
import encryptor

# initialize
app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')
load_dotenv()
client = pymongo.MongoClient(os.getenv("MONGO_CLIENT_URL"), tlsCAFile=certifi.where())
db = client["EE461L"]

# create collection
users = db["User"]
projects = db["Project"]
hwsets = db["HWSet"]

# create practice HWSets
hw1 = HWSet(100)
hw2 = HWSet(50)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route("/test", methods=['POST', 'GET'])
def hw_pick():
    hw_id = request.form.get("hw_id")
    qty = request.form.get("qty")

    if request.method == 'POST':
        print(str(hw_id))
        print(str(qty))

    return {}.format(hw_id, qty, hw1.get_capacity())


# users
@app.route("/users", methods=["POST", "GET"])
def createUser():
    if request.method == "POST":
        json = request.get_json(force=True)
        message = ""
        json = request.get_json()
        user = json["userid"]
        user_found = users.find_one({"userid": user})
        if user_found:
            message = 'Userid already exists'
            return message
        encrypted_pass = encryptor.encrypt(json["password"])

        ditem = {
            "userid": json["userid"],
            "password": encrypted_pass,
            "username": json["username"]
        }
        users.insert_one(ditem)

        return "User " + json["userid"] + " Created"


@app.route("/users/login", methods=["POST"])
def login():
    json = request.get_json(force=True)
    print(json)
    user = json['userid']
    password = json['password']
    encrypted_pass = encryptor.encrypt(password)
    user_found = users.find_one({"userid": user})
    if user_found is not None:
        # user exists
        if encrypted_pass == user_found["password"]:
            # correct password
            message = 'Correct password'
            return message
        else:
            # incorrect password
            message = 'Incorrect password'
            return message
    else:
        # user doesn't exist
        message = 'User does not exist'
        return message


# projects
@app.route("/projects", methods=["POST"])
def createProject():
    json = request.get_json(force=True)
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
    json = request.get_json(force=True)
    project_found = projects.find_one({"ID": json["projectId"]})
    if project_found:
        if json["userId"] in project_found["AuthorizedUsers"]:
            return "Project Accessed"
        else:
            return "Access Denied"
    else:
        return "Project Does Not Exist"


@app.route("/projects/addUser", methods=["POST", "GET"])
def joinProject():
    json = request.get_json(force=True)
    projectId = json["projectId"]
    userId = json["userId"]
    project_found = projects.find_one({"ID": projectId})
    #if project exists
    if project_found:
        #if user hasn't been added already
        if userId not in project_found["AuthorizedUsers"]:
            authusers = [i for i in project_found["AuthorizedUsers"]]
            authusers.append(userId)
            result = projects.replace_one({"ID": projectId}, {"AuthorizedUsers": authusers})
            message = "Successfully added " + userId + " to " + projectId
            return message
        else:
            message = userId + " is already an authorized user"
            return message
    else:
        message = "Project Does Not Exist"
        return message


@app.route("/projects/removeUser", methods=["POST", "GET"])
def leaveProject():
    json = request.get_json(force=True)
    projectId = json["projectId"]
    userId = json["userId"]
    project_found = projects.find_one({"ID": projectId})
    # if project exists
    if project_found:
        # if user hasn't been added already, else has been added
        if userId not in project_found["AuthorizedUsers"]:
            message = userId + " is not an authorized user"
            return message
        else:
            authusers = [i for i in project_found["AuthorizedUsers"]]
            authusers.remove(userId)
            result = projects.replace_one({"ID": projectId}, {"AuthorizedUsers": authusers})
            message = "Successfully removed " + userId + " from " + projectId
            return message
    else:
        message = "Project Does Not Exist"
        return message

# hwsets
@app.route("/hwsets", methods=["POST"])
def createHw():
    json = request.get_json(force=True)

    ditem = {
        "Name": json["Name"],
        "Capacity": json["Capacity"],
        "Availability": json["Availability"]
    }
    hwsets.insert_one(ditem)


@app.route("/check_in", methods=["POST", "GET"])
def checkIn_hardware():
    json = request.get_json(force=True)
    qty = json["qty"]
    name = json["Name"]
    hw_found = hwsets.find_one({"Name": name})

    # if hwset exists
    if hw_found:
        capacity = hw_found["Capacity"]
        availability = hw_found["Availability"]
        # if qty is allowed to be checked in
        if qty <= capacity - availability:
            availability += qty
            result = hwsets.replace_one({"Name": name}, {"Availability": availability})
            message = qty + " of " + name + " has been checked in"
            return message
        else:
            message = "Quantity to check in is too large"
            return message
    else:
        message = "Hardware name does not exist"
        return message


@app.route("/check_out", methods=["POST", "GET"])
def checkOut_hardware():
    json = request.get_json(force=True)
    qty = json["qty"]
    name = json["Name"]
    hw_found = hwsets.find_one({"Name": name})

    # if hwset exists
    if hw_found:
        capacity = hw_found["Capacity"]
        availability = hw_found["Availability"]
        # if qty is allowed to be checked out
        if qty <= availability:
            availability -= qty
            result = hwsets.replace_one({"Name": name}, {"Availability": availability})
            message = qty + " of " + name + " has been checked out"
            return message
        else:
            message = "Quantity to check out is too large"
            return message
    else:
        message = "Hardware name does not exist"
        return message


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))