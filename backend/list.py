import json
import datetime
import uuid

class List:
    def __init__(self, name=""):
        self.name = name
        self.lists = {}

    # creates a new list to add to the 'lists' dictionary
    def createList(self, title, description=""): # title should be a string

        if title in self.lists.keys():
            return "A list with this title already exists"
        
        self.lists[title] = {"id": str(uuid.uuid4()), "listTitle":title, "description":description, "items":{}}

        with open('list.json', 'w') as f: # Opening our list.json file so we can write something in it
                     # we're converting the data (which is the dictionary of list dictionaries) to json format and then dumping it into the .json file
                     # ensure_ascii=False makes sure that you can see any icons that are written, cuz that could get converted to ASCII format
                     # indent=4 formats the file so that it will be more readable (not all on one line) and it has 4 spaces for each indent
                    json.dump(self.lists, f, ensure_ascii=False, indent=4)

        return "New list was created!!"
    
    # Added a new item to the list
    def addToList(self, title, itemName, dueDate, done):

        if title in self.lists.keys():
            if itemName not in self.lists[title]["items"].keys():
                self.lists[title]["items"][itemName] = {"id": str(uuid.uuid4()), "itemName":itemName, "dueDate":dueDate.strftime("%B %d"+ str(", ") + "%Y"), "done":done}
                with open('list.json', 'w') as f:
                    json.dump(self.lists, f, ensure_ascii=False, indent=4)
                return "A new item was added to the list! You're welcome!!"
            else:
                return ("This item already exists in your " + str(title) + " list")
        return ("The " + str(title) + " list was not found :(")
    
    
    # Removes item from a list based on the title of the list and the list item name. Maybe we could send the index later to save time
    def removeListItem(self, title, itemName):
        if title in self.lists.keys():
            if itemName in self.lists[title]["items"].keys():
                del self.lists[title]["items"][itemName]
                with open('list.json', 'w') as f:
                    json.dump(self.lists, f, ensure_ascii=False, indent=4)
                return "List item was removed"
            else:
                return ("Could not find the " + str(itemName) + " item in the " + str(title) + " list :(")
        else:
            return ("Could not find the " + str(title) + " list :(")
    
    # Deletes an entire list from the lists array
    def deleteList(self, title):
        if title in self.lists.keys():
            del self.lists[title]
            with open('list.json', 'w') as f:
                json.dump(self.lists, f, ensure_ascii=False, indent=4)
            return ("The " + str(title) + " list was removed :)")
        return ("I couldn't find the " + str(title) + " list :(")

# ------------------------------------------------------------------Test for myself -------------------------------------------------------------

"""
myList = List("CookieDough")

print("\nmyList.name: " + str(myList.name))
print("\nmyList: " + str(myList.lists) + "\n")

print(myList.createList("To Do", "Reminder for what I have to do today"))

print("\nmyList: " + str(myList.lists) + "\n") 


print(myList.createList("To Do", "Heyyy"))

print("\nmyList: " + str(myList.lists) + "\n")

date1 = datetime.datetime(2025, 4, 25)

print(myList.addToList("To Do", "Buy groceries", date1, True))

print("\nmyList: " + str(myList.lists) + "\n")

date2 = datetime.datetime(2025, 4, 30)

print(myList.addToList("To Do", "Finish list project", date2, False))

print("\nmyList: " + str(myList.lists) + "\n")

print(myList.addToList("Grocery", "Cheese", date2, True))

print("\n" + myList.addToList("To Do", "Finish list project", date2, False))


print (myList.removeListItem("To Do", "Finish list project"))

print("myList: " + str(myList.lists))


print("\n\n" + myList.deleteList("To Do"))

print("\nmyList.name: " + str(myList.name))
print("\nmyList: " + str(myList.lists))

print("\n" + myList.deleteList("To Do") + "\n")

"""