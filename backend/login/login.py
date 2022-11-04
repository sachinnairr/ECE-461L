#file to allow user to login to the site
import collections
import pymongo
import os
from pymongo import MongoClient
from pymongo.errors import OperationFailure
import encryption
client = pymongo.MongoClient(os.getenv("MONGO_CLIENT_URL"))
db = client["EE461L"]
mycol = db["Users"]

class user:
    def __init__(self, username, password, userID) -> None:
        self.__username = username
        self.__password = password
        self.__userID = userID
    def getUsername(self):
        return self.__username
    def getPassword(self):
        return customEncrypt(self.__password)
def login():
    login_input = user.getUsername()
    if login_input == 'Login':
        username_inp = input('Username:')
        pwd_inp = input('Password:')

        user_found = mycol.find_one({"username": username_inp})  # query by specified username
        if user_found:  # user exists
            if pwd_inp == user_found['password']:
                print('Login success!\n')
            else:
                print('Wrong password')
        else:
            print('User not found')
    elif login_input == 'Register':
        new_username = input('Username:')
        new_password = input('Password:')
        tobeaddedtodb = {"username": new_username, "password": new_password}
        adding = mycol.insert_one(tobeaddedtodb)
        print("Registered!\n")

    '''
    def authenticate(self, username, password):
        client = pymongo.MongoClient(os.getenv("MONGO_CLIENT_URL"))
        db = client["EE461L"]
        auth = False
        failed_message = 'bad auth Authentication failed.' # this is the err message returned on a failed authentication
        uri = f'mongodb+srv://sachinnairr:mogno123@cluster0.txm6jf5.mongodb.net/?retryWrites=true&w=majority'
        client = MongoClient(uri)
        col = db["Users"]
        try:
            db.col.find(username)

        except OperationFailure as e:
            assert(e.details['errmsg'] == failed_message) # assert that the error message is that of an authentication failure
        else:
            try:
                db.col.find(password)

            except OperationFailure as e:
                assert(e.details['errmsg'] == failed_message) # assert that the error message is that of an authentication failure
            else:
                auth = True
        return auth
'''

