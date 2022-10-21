import urllib
import pymongo
from pymongo import MongoClient
import datetime
from pymongo.server_api import ServerApi

client = pymongo.MongoClient("mongodb+srv://alannguyen2020:lSIODD5ualy5rvAT@cluster0.hf6lgik.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = client["EE461L"]
HWSetCollection = db["HWSet"]
ProjectsCollection = db["Projects"]
UserCollection = db["User"]

HWSet1Document = {"Name": "HWSet1",
                  "Capacity": 200,
                  "Availability": 100}
Project1Document = {"Name": "Project1",
                    "ID": "as1234",
                    "Description": "This is the first project",
                    "AuthorizedUsers": ["alannguyen", "caelanliutest"]}
User1Document = {"Username": {"First": "Alan", "Last": "Nguyen"},
                 "UserID": "alannguyen",
                 "Password": "password123"}


print(db.list_collection_names())
client.close()
