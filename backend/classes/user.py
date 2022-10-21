# The User class holds general data about users

class User:
    # The __init__ method accepts arguments for the year, rating. It initializes the private data attributes with these
    # values to any values you like.

    def __init__(self):
        self.__userID = 0
        self.__username = "Name"
        self.__password = "Password"

    def set_userID(self, userID):
        self.__userID = userID

    def set_username(self, username):
        self.__username = username

    def set_password(self, password):
        self.__password = password


    # Accessors
    def get_userID(self):
        return self.__userID

    def get_username(self):
        return self.__username

    def get_password(self):
        return self.__password
