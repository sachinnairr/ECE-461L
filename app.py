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
client = pymongo.MongoClient("mongodb+srv://sachinnairr:sachinnairr123@cluster0.txm6jf5.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certifi.where())
db = client["EE461L"]

# create collection
users = db["User"]
projects = db["Project"]
hwsets = db["HWSet"]

# create practice HWSets
# hw1 = HWSet(100)
# hw2 = HWSet(50)


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
    projectid = json["ID"]
    project_found = projects.find_one({"ID": projectid})
    if project_found is None:
        #project doesn't exist yet, can be created
        authusers = [i for i in json["AuthorizedUsers"]]
        ditem = {
            "Name": json["Name"],
            "ID": json["ID"],
            "Description": json["Description"],
            "AuthorizedUsers": authusers
        }
        projects.insert_one(ditem)
        message = "Project " + json["Name"] + " Added With ID: " + json["ID"]
        return message
    else:
        message = "Project ID already exists"
        return message


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

@app.route("/projects/getID", methods=["POST"])
def getProjectID():
    json = request.get_json(force = True)
    project_found = projects.find_one({"ID": json["projectId"]})
    data = {
        "Name": project_found["Name"],
        "ID": project_found["ID"],
        "Description": project_found["Description"],
        "AuthorizedUsers": project_found["AuthorizedUsers"],
    }
    return data

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
@app.route("/hwsets/getAvailability", methods=["POST"])
def getHwAvailability():
    json = request.get_json(force=True)
    name = json["Name"]
    hw_found = hwsets.find_one({"Name": name})
    if hw_found is not None:
        #hw name exists, then return availability
        availability = hw_found["Availability"]
        return str(availability)
    else:
        #if hw name doesn't exist, return error -1
        availability = -1
        return str(availability)

@app.route("/hwsets/getCapacity", methods=["POST"])
def getHwCapacity():
    json = request.get_json(force=True)
    name = json["Name"]
    hw_found = hwsets.find_one({"Name": name})
    if hw_found is not None:
        #hw name exists, then return capacity
        capacity = hw_found["Capacity"]
        return str(capacity)
    else:
        #if hw name doesn't exist, return error -1
        capacity = -1
        return str(capacity)

@app.route("/hwsets/setAvailability", methods=["POST"])
def setHwAvailability():
    json = request.get_json(force=True)
    name = json["Name"]
    hw_found = hwsets.find_one({"Name": name})
    if hw_found is not None:
        #hw name exists, then return availability
        availability = hw_found["Availability"]
        print(json["Quantity"])
        return str(json["Quantity"])
    else:
        #if hw name doesn't exist, return error -1
        print(name)
        availability = -1
        return str(availability)

@app.route("/hwsets/setCapacity", methods=["POST"])
def setHwCapacity():
    json = request.get_json(force=True)
    name = json["Name"]
    hw_found = hwsets.find_one({"Name": name})
    if hw_found is not None:
        #hw name exists, then return capacity
        capacity = hw_found["Capacity"]
        return str(capacity)
    else:
        #if hw name doesn't exist, return error -1
        capacity = -1
        return str(capacity)

@app.route("/hwsets/checkIn", methods=["POST"])
def checkIn():
    json = request.get_json(force=True)
    name = json["Name"]
    hw_found = hwsets.find_one({"Name": name})
    if hw_found:
        #hw name exists, then return capacity
        capacity = hw_found["Capacity"]
        availability = hw_found["Availability"]
        h = HWSet(capacity, availability)
        num = int(json["Quantity"])
        h.check_in(num)
        availability = h.get_availability()

        query = {"Name": name}
        newvalues = { "$set": { "Availability":  availability} }

        hwsets.update_one(query, newvalues)

        return str(availability)
    else:
        #if hw name doesn't exist, return error -1
        availability = -1
        return str(availability)

@app.route("/hwsets/checkOut", methods=["POST"])
def checkOut():
    json = request.get_json(force=True)
    name = json["Name"]
    hw_found = hwsets.find_one({"Name": name})
    if hw_found:
        #hw name exists, then return capacity
        capacity = hw_found["Capacity"]
        availability = hw_found["Availability"]
        h = HWSet(capacity, availability)
        num = int(json["Quantity"])
        h.check_out(num)

        availability = h.get_availability()

        query = {"Name": name}
        newvalues = { "$set": { "Availability":  availability} }

        hwsets.update_one(query, newvalues)

        return str(availability)
    else:
        #if hw name doesn't exist, return error -1
        availability = -1
        return str(availability)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
