import requests
import datetime

BASE_URL = "http://localhost:5001"

response = requests.post(f"{BASE_URL}/create", json={
    "title": "Groceries",
    "description": "Things to buy"
})
print("Create List:", response.json())



response = requests.post(f"{BASE_URL}/add", json={
    "title": "Groceries",
    "itemName": "Milk",
    "dueDate": datetime.datetime(2025, 4, 25).strftime("%B %d"+ str(", ") + "%Y"),
    "done": True
})
print("Add to a List:", response.json())


response = requests.post(f"{BASE_URL}/add", json={
    "title": "Groceries",
    "itemName": "Eggs",
    "dueDate": datetime.datetime(2025, 4, 30).strftime("%B %d"+ str(", ") + "%Y"),
    "done": False
})
print("Add to a List:", response.json())


response = requests.post(f"{BASE_URL}/getList", json = {
    "title": "Groceries"
})
print("\nReturned a list:", response.json(), "\n")


response = requests.get(f"{BASE_URL}/allLists")
print("Returns all lists: ", response.json(), "\n")


response = requests.post(f"{BASE_URL}/removeItem", json={
    "title": "Groceries",
    "itemName": "Milk"
})
print("Remove from a List:", response.json())

response = requests.post(f"{BASE_URL}/deleteList", json={
    "title": "Groceries"
})

def load(self):
        try:
            with open('list.json', 'r') as f:
                self.lists = json.load(f)
        except FileNotFoundError:
            self.lists = {}