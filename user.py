from app import app, col_user
from flask import request, json



@app.route("/user/create", methods=["GET", "POST"])
def create():
    request_data = request.get_json()
    response = request_data
    userid = request_data['userid']
    name = request_data['username']
    password = request_data['password']

    user_found = col_user.find_one({"userid": userid})
    # if user not found in user collection, add to col_users
    if user_found is None:
        col_user.insert_one(
            {
                "userid": userid,
                "username": name,
                # TODO ENCRYPT PASSWORD BEFORE PASSING TO DATABASE
                "password": password
            }
        )
        response["status"] = 200
    else:
        # user exists already
        response["status"] = 400
    return response


@app.route("/user/login", methods=["POST"])
def login():
    # request_data = json.loads(request.data)
    request_data = request.get_json()
    response = request_data
    userid = request_data['userid']
    password = request_data['password']

    user = col_user.find({}, {"userid": userid})
    user_found = col_user.find_one({"userid": userid})

    if user_found is not None:
        #user exists
        if password == user_found["password"]:
            #correct password
            response["status"] = 200
        else:
            #incorrect password
            response["status"] = 401
    else:
        #user doesn't exist
        response["status"] = 400
    return response


