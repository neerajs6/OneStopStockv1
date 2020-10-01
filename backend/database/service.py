
from .database import MongoRepository
from .schema import UserSchema
from passlib.hash import pbkdf2_sha256


class Service(object):
    def __init__(self, user_id, repo_client=MongoRepository()):
        self.repo_client = repo_client
        self.user_id = user_id

        if not user_id:
            raise Exception("user id not provided")


    def login(self, user):
        username = user['username']
        password = user['password']
        print(password)
        all_users = self.repo_client.find_all_users()
        for x in all_users:
            print(x)
            if x['username'] == username:
                valid = self.repo_client.validate_password(x["_id"], password)
                if valid:
                    id = str(x["_id"])
                    return {"status" : 200,
                            "id" : id,
                            "username": username }
                else:
                    return {"status" : 403,
                            "comment": "incorrect password"}
        else:
            return {"status" : 403,
                    "comment": "incorrect username"}



    def create_user_for(self, user):
        print(user)
        username = user['username']
        password = pbkdf2_sha256.hash(user['password'])
        

        all_users = self.repo_client.find_all_users()

        for x in all_users:
            print(x)
            if x['username'] == username:
                return {"status" : 500,
                "comment" : "name_taken"}
            if x['email'] == user['email']:
                return {"status" : 500,
                "comment" : "email_has_account"}


        new_user = {"first_name": user['first_name'],
                    "last_name": user['last_name'],
                    "username": username,
                    "email": user['email'],
                    "password": password,
                    "registered_date": user['registered_date']}

        id = self.repo_client.create_user(new_user).inserted_id
        id = str(id)
        return {"status" : 200,
                "id" : id,
                "username": username }

    def get_user_info(self, id):
        user = self.repo_client.get_user_info({"id":id})
        return user

    def add_to_favorites(self, symbol):
        result = self.repo_client.add_to_favorites(symbol["symbol"], symbol["id"])
        return result

    def remove_from_favorites(self, symbol):
        result = self.repo_client.remove_from_favorites(symbol["symbol"], symbol["id"])
        return result

    def is_favorite(self, symbol):
        result = self.repo_client.is_favorite(symbol["symbol"], symbol["id"])
        return result

    def get_all_favorites(self, user_id):
        result = self.repo_client.get_all_favorites(user_id)
        return result

    def update_user_info(self, info):
        all_users = self.repo_client.find_all_users()
        if info['field'] == 'username':
            print("username")
            for x in all_users:
                if x['username'] == info['value']:
                    return {"status" : 500,
                    "comment" : "username_taken"}

        result = self.repo_client.update_user_info(info)
        if result['nModified'] == 1:
            print("HELLO")
            return {"status" : 200,
            "comment" : "updated"}




    def delete_user(self, id):
        result = self.repo_client.delete_user(id)
        if result:
            return {"status": 200, "comment":"account deleted"}
        return {"status" : 500,
                "comment" : "unable to delete account"}

    def dump(self, data):
        return UserSchema().dump(data)

