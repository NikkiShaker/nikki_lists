from flask import Flask, request, jsonify
from flask_cors import CORS
from list import List

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

print("Enter your name: ")
name = input()

myList = List(str(name)) # creating list for the person with the name inputted

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the List Management API!"

@app.route('/getList', methods=['POST'])
def get_list():

    data = request.get_json()
    title = data.get("title")

    result = myList.getList(title)

    return jsonify(result)

@app.route('/allLists', methods=['GET'])
def all_lists():
    return jsonify(myList.lists)


@app.route('/create', methods=['POST'])
def create_list():

    data = request.get_json()
    title = data.get("title")
    description = data.get("description")

    result = myList.createList(title, description)

    return jsonify(result)


@app.route('/add', methods=['POST'])
def add_to_list():

    data = request.get_json()
    title = data.get("title")
    itemName = data.get("itemName")
    dueDate = data.get("dueDate")
    done = data.get("done")

    result = myList.addToList(title, itemName, dueDate, done)

    return jsonify(result)

@app.route('/itemCompleted', methods=['POST'])
def item_completed():

    data = request.get_json()
    title = data.get("title")
    itemName = data.get("itemName")
    done = data.get("done")

    result = myList.itemCompleted(title, itemName, done)

    return jsonify(result)

@app.route('/removeItem', methods=['POST'])
def remove_list_item():

    data = request.get_json()
    title = data.get("title")
    itemName = data.get("itemName")

    result = myList.removeListItem(title, itemName)

    return jsonify(result)

@app.route('/deleteList', methods=['POST'])
def delete_list():

    data = request.get_json()
    title = data.get("title")

    result = myList.deleteList(title)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5001)