import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CreateList from './CreateList';
import './App.css'

function App() {
  const [data, setData] = useState({});
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescInput(event.target.value);
  };


  // Creates Grocery list
  /*  useEffect(() => {
      axios.post("http://localhost:5001/create", { title: "Groceries", description: "For remembering" })
        .then(response => {
          setData(response.data);
          console.log("Creating Grocery list: ", response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, []);*/

  // Creates To Do list
  /* useEffect(() => {
        axios.post("http://localhost:5001/create", { title: "To Do", description: "Things I gotta do before Monday" })
          .then(response => {
            setData(response.data);
            console.log("Creating To Do list: ", response.data);
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      }, []);*/

  // Returns all lists
  useEffect(() => { // Using useEffect to fetch data from the /getList route in the backend
    axios.get("http://localhost:5001/allLists")
      .then(res => {
        setData(res.data)
        console.log("current list: " + JSON.stringify(res.data));
      })
      .catch(error => {
        console.error("Error with catching lists: ", error);
      });
  }, [])


  // Function that creates a new list
  const createList = async () => {
    try {
      const response = await axios.post("http://localhost:5001/create", {
        title: titleInput,
        description: descInput
      });
      console.log("create response: ", response.data);

      setTitleInput(""); // Clear title input textbox
      setDescInput(""); // Clear description input textbox as well
    }
    catch (error) {
      console.log("Error creating list: " + error)
    }
  }


  return (
    <>
      <div>
        <p>Name of List: </p>
        <input type="text" value={titleInput} onChange={handleTitleChange} /><br />

        <p>Description: </p>
        <input type="text" value={descInput} onChange={handleDescChange} /><br /><br />

        <button onClick={createList}>Create New List</button>

        <div>
          {(Object.keys(data).length === 0) ? (
            <p>Loading...</p>
          ) : (
            Object.entries(data).map(([title, list], i) => (
              <p key={i}>
                <strong>{title} List </strong> - {list.description}
              </p>
            ))
          )}
        </div>

      </div>
    </>
  )
}

export default App
