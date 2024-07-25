import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

def get_codeforce_stats(username):
    url = f"https://codeforces.com/profile/{username}/"
    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "User not found or unable to retrieve data"}

    soup = BeautifulSoup(response.content, "html.parser")

    stats = {}
    array = []
    ele = soup.find("div", class_="info")
    for list in ele.ul.li.find_all("span"):
        array.append(list.get_text())
       
    stats['ranking'] = array[0]
    stats['user-rank'] = array[2]
    stats['max-rank'] = array[3]
    return stats

def leetcodeStats(username):
    url = f'https://alfa-leetcode-api.onrender.com/userProfile/{username}'
    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "User not found or unable to retrieve data"}

    try:
        data = response.json()
    except requests.exceptions.JSONDecodeError:
        return {"error": "Failed to decode JSON response", "response_text": response.text}

    return data

def appendUsername(data, username):
    data['_id'] = username
    return data

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/stats"
mongo = PyMongo(app)

@app.route("/add_lc/<username>", methods=["POST"])
def add_data_lc(username):
    data = leetcodeStats(username)
    mongo.db.LC.delete_many({"_id": username})
    mongo.db.LC.insert_one(appendUsername(data, username))
    return "Data added"

@app.route("/add_cf/<username>", methods=["POST"])
def add_data_cf(username):
    data = get_codeforce_stats(username)
    mongo.db.CF.delete_many({"_id": username})
    mongo.db.CF.insert_one(appendUsername(data, username))
    return "Data added"

@app.route("/get_lc/<username>", methods=["GET"])
def get_data_lc(username):
    data = mongo.db.LC.find_one({"_id": username})
    if data:
       data['_id'] = str(data['_id'])
       return jsonify(data), 200
    return jsonify({'message': 'User not found'}), 404

@app.route("/get_cf/<username>", methods=["GET"])
def get_data_cf(username):
    data = mongo.db.CF.find_one({"_id": username})
    if data:
       data['_id'] = str(data['_id'])
       return jsonify(data), 200
    return jsonify({'message': 'User not found'}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
