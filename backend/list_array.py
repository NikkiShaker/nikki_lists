import json
import datetime
import uuid

class List:
    def __init__(self, name=""):
        self.name = name
        self.lists = []

    # creates a new list to add to the 'lists' array
    def createList(self, title, description=""): # title should be an empty object {}

        for aList in self.lists:
            if title == aList["listTitle"]:
                return "A list with this title already exists"
        # uuid is a python library that generates a unique id for each object in the array
        self.lists.append({"id": str(uuid.uuid4()), "listTitle":title, "description":description, "items":[]}) # appending a newly created object using function parameters
        
        with open('list.json', 'w') as f: # Opening our list.json file so we can write something in it
                     # we're converting the data (which is the array of list objects) to json format and then dumping it into the .json file
                     # ensure_ascii=False makes sure that you can see any icons that are written, cuz that could get converted to ASCII format
                     # indent=4 formats the file so that it will be more readable (not all on one line) and it has 4 spaces for each indent
                    json.dump(self.lists, f, ensure_ascii=False, indent=4)

        return "New list was created!!"
    
    # Added a new item to the list
    def addToList(self, title, itemName, dueDate, done):
        for aList in self.lists:
            if aList["listTitle"] == title:
                aList["items"].append({"id": str(uuid.uuid4()), "itemName":itemName, "dueDate":dueDate.strftime("%B %d"+ str(", ") + "%Y"), "done":done}) # strftime formats the time
                
                with open('list.json', 'w') as f:
                    json.dump(self.lists, f, ensure_ascii=False, indent=4)
                
                return "A new item was added to the list! You're welcome!!"
        return ("The " + str(title) + " list was not found :(")

#    def getListIndex(self, title):
 #       for i, alist in enumerate(List):

    
    # Removes item from a list based on the title of the list and the list item name. Maybe we could send the index later to save time
    def removeListItem(self, title, itemName):
        for index1, aList in enumerate(self.lists):
            if aList["listTitle"] == title:
                for index2, anItem in enumerate(aList["items"]):
                    if anItem["itemName"] == itemName:
                        self.lists[index1]["items"].pop(index2)
                        
                        with open('list.json', 'w') as f:
                            json.dump(self.lists, f, ensure_ascii=False, indent=4)

                        return "List item was removed"
        return (str(title) + " list item was not found :(")
    
    # Deletes an entire list from the lists array
    def deleteList(self, title):
        for index, aList in enumerate(self.lists): # lets you have a value that stores index of that element in the array. You can replace index with anything
            if aList["listTitle"] == title:
                self.lists.pop(index)

                with open('list.json', 'w') as f:
                    json.dump(self.lists, f, ensure_ascii=False, indent=4)

                return ("The " + str(title) + " list was removed :)")
        return ("I couldn't find the " + str(title) + " list :(")


# ------------------------------------------------------------------Test for myself -------------------------------------------------------------



myList = List("CookieDough")

print("\nmyList.name: " + str(myList.name))
print("\nmyList: " + str(myList.lists) + "\n")

print(myList.createList("To Do", "Reminder for what I have to do today"))

print("\nmyList: " + str(myList.lists) + "\n") 



print(myList.createList("To Do", "Heyyy"))

print("\nmyList: " + str(myList.lists) + "\n")

date1 = datetime.datetime(2025, 4, 25)

print(myList.addToList("To Do", "Buy groceries", date1, True))

print("\nmyList: " + str(myList.lists))

print("\nmyList['To Do'].id: " + str(myList.lists[0]["id"]) + "\n")

"""


date2 = datetime.datetime(2025, 4, 30)

print(myList.addToList("To Do", "Finish list project", date2, False))

print("myList: " + str(myList.lists))

print(myList.addToList("Grocery", "Cheese", date2, True))

print (myList.removeListItem("To Do", "Finish list project"))

print("myList: " + str(myList.lists))

print(myList.deleteList("To Do"))

print("myList.name: " + str(myList.name))
print("myList: " + str(myList.lists))

print(myList.deleteList("To Do"))

"""