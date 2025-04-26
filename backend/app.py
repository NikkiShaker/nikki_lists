from flask import Flask, request, jsonify
from flask_cors import CORS
from list import List

app = Flask(__name__)
CORS(app, origins="http://localhost:3001")

print("Enter your name: ")
name = input()

myList = List(str(name)) # creating list for the person with the name inputted



