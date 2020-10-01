from .middlewares import login_required
from flask import Flask, json, g, request
from flask_cors import CORS, cross_origin
import requests
from .database.schema import UserSchema
from .database.service import Service as User


app = Flask(__name__)
CORS(app)

@app.route("/stocks/<string:stock_name>", methods=["GET"])
@cross_origin(origin='*')
def index(stock_name):
    r = requests.get(f'https://finnhub.io/api/v1/stock/recommendation?symbol={stock_name}&token=btf8alv48v6q15vvc6p0')
    print(json_response(r.json()))
    return json_response(r.json())

@app.route("/register", methods=["POST"])
@cross_origin(origin='*')
def create():
    user = User(12).create_user_for(json.loads(request.data))
    return json_response(user)

@app.route("/login", methods=["POST"])
@cross_origin(origin='*')
def login():
    user = User(12).login(json.loads(request.data))
    return json_response(user)

@app.route("/account/<string:id>", methods=["GET"])
@cross_origin(origin='*')
def get_user_info(id):
    user = User(12).get_user_info(id)
    return json_response(user)

@app.route("/add_to_favorites", methods=["POST"])
@cross_origin(origin='*')
def add_to_favorites():
    print(json.loads(request.data))
    result = User(12).add_to_favorites(json.loads(request.data))
    if result:
        return {"status":200}
    return {"status":500}

@app.route("/remove_from_favorites", methods=["POST"])
@cross_origin(origin='*')
def remove_from_favorites():
    print(json.loads(request.data))
    result = User(12).remove_from_favorites(json.loads(request.data))
    if result:
        return {"status":200}
    return {"status":500}

@app.route("/is_favorite", methods=["POST"])
@cross_origin(origin='*')
def is_favorite():
    print(json.loads(request.data))
    result = User(12).is_favorite(json.loads(request.data))
    if result:
        return {"status":200, "comment":"is_favorite"}
    return {"status":500,  "comment":"not_favorite"}

@app.route("/get_all_favorites/<string:id>", methods=["GET"])
@cross_origin(origin='*')
def get_all_favorites(id):
    result = User(12).get_all_favorites(id)
    if result:
        result = [r for r in result]
        return json_response(result)
    return {"status":500,  "comment":"not_favorite"}


@app.route("/update_user_info", methods=["POST"])
@cross_origin(origin="*")
def update_info():
    result = User(12).update_user_info(json.loads(request.data))
    return result

@app.route("/delete_user", methods=["POST"])
@cross_origin(origin='*')
def delete_user():
    result = User(12).delete_user(json.loads(request.data))
    return result
    











#    github_repo = GithubRepoSchema().load(json.loads(request.data))

#    if github_repo.errors:
#      return json_response({'error': github_repo.errors}, 422)

#    kudo_service = Kudo(g.user)
#    if kudo_service.update_kudo_with(repo_id, github_repo):
#      return json_response(github_repo.data)
#    else:
#      return json_response({'error': 'kudo not found'}, 404)

# @app.route("/kudo/<int:repo_id>", methods=["DELETE"])
# def delete(repo_id):
#  kudo_service = Kudo(g.user)
#  if kudo_service.delete_kudo_for(repo_id):
#    return json_response({})
#  else:
#    return json_response({'error': 'kudo not found'}, 404)

def json_response(payload, status=200):
 return (json.dumps(payload), status, {'content-type': 'application/json'})