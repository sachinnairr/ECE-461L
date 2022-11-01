from flask import Flask, request, render_template

app = Flask(__name__, static_folder='./build', static_url_path='/')

@app.route('/params')
def params():
    projectID = request.args['projectID']
    qty = request.args['qty']
    return 'projectID: ' + str(projectID) + ' Qty: ' + str(qty)