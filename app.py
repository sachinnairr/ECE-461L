import os
from backend.classes.HWSet import HWSet
from flask import Flask, send_from_directory, jsonify, request

app = Flask(__name__, static_url_path='', static_folder='ui/build/')

@app.route('/')
def index():
    return send_from_directory('ui/build/', 'index.html')

hw1 = HWSet(100)
hw2 = HWSet(50)

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))