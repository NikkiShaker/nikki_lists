import React, { useState, useEffect } from 'react'
import { Navigate, Link } from "react-router-dom"
import axios from 'axios';
import CreateList from './CreateList';
import '../styles/Home.css';

function Home() {
  const [data, setData] = useState({});
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [createNewList, setCreateNewList] = React.useState(false);



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
        //console.log("current list: " + JSON.stringify(res.data));
      })
      .catch(error => {
        console.error("Error with catching lists: ", error);
      });
  }, [])


  if (createNewList) {
    return <Navigate to="/create" />
  }


  return (
    <>
      <div>

        <button onClick={() => setCreateNewList(true)}> Create A New List</button>

        <div>
          {(Object.keys(data).length === 0) ? (
            <p>Loading...</p>
          ) : (
            Object.entries(data).map(([title, list], i) => (
              <p key={i}>
                <Link to={`/list/${encodeURIComponent(title)}`}>
                  <button><strong>{title} List: </strong> {list.description}</button>
                </Link>
              </p>
            ))
          )}
        </div>

      </div>
    </>
  )
}

export default Home
