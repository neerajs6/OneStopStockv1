import os
from pymongo import MongoClient
from bson import objectid
from passlib.hash import pbkdf2_sha256





COLLECTION_NAME = 'one_stop_stock'

DB_URI = "mongodb+srv://stock_app_local_dev:zHJlRyaHcYusbnGC@cluster0.wlexg.mongodb.net/one_stop_stock?retryWrites=true&w=majority"

class MongoRepository(object):
    def __init__(self):
        mongo_url = DB_URI
        self.db = MongoClient(mongo_url).stock

    def get_user_info(self, user):
        print(user['id'])
        user = self.db.users.find_one({"_id": objectid.ObjectId(user['id'])}, {"_id":0,"first_name":1, "last_name":1, "registered_date":1, "email": 1, "username": 1})
        print(user)
        return user

    def find_user(self, id):
        user = self.db.users.find_one({"_id": id})
        return user


    def create_user(self, user):
        return self.db.users.insert_one(user)

    def update_user(self, selector, users):
        return self.db.users.replace_one(selector, user).modified_count

    def delete_user(self, id):
        query = {"_id":objectid.ObjectId(id["id"])}
        return self.db.users.delete_one(query).acknowledged


    def find_all_users(self):
        return self.db.users.find({}, {"username": 1, "email":1})

    def validate_password(self, id, password):
        user = self.db.users.find_one({"_id": id})
        return pbkdf2_sha256.verify(password, user['password'])

    def add_to_favorites(self, symbol, id):
        document = {"user_id":id, "stock_symbol":symbol}
        return self.db.user_favorites.insert_one(document).acknowledged
    
    def remove_from_favorites(self, symbol, id):
        document = {"user_id":id, "stock_symbol":symbol}
        return self.db.user_favorites.delete_one(document).acknowledged

    def is_favorite(self, symbol, id):
        document = {"user_id":id, "stock_symbol":symbol}
        result = self.db.user_favorites.find_one(document)
        if result is not None:
            return True
        return False

    def get_all_favorites(self, id):
        document = {"user_id": id}
        result = self.db.user_favorites.find(document, {"_id":0, "user_id":1, "stock_symbol":1})
        return result

    def update_user_info(self, info):
        query = {'$set' : {info['field']:info['value']}}
        result = self.db.users.update({"_id": objectid.ObjectId(info['id'])}, query)
        print("RESULt", result['nModified'])
        return result

        
        
