import React, { useState, useEffect } from 'react'
import { Navigate, Link } from "react-router-dom"
import axios from 'axios';
import Box from '../components/Box.jsx';
import CreateList from './CreateList';
import '../styles/Home.css';

import Checkbox from '@mui/material/Checkbox';
import { HeartCheck } from "../components/HeartCheck.jsx";

function Home() {
  const [data, setData] = useState({});
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [createNewList, setCreateNewList] = React.useState(false);
  const [isChecked, setIsChecked] = useState({}); // For checkboxes

  // This way we won't need to manually refresh it when we want to add a new item
  const [itemCount, setItemCount] = useState(0);

  const handleIsCheckedChange = (title) => (event) => {
    setIsChecked(prev => ({
      ...prev,
      [title]: event.target.checked
    }));
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
        //console.log("current list: " + JSON.stringify(res.data));
      })
      .catch(error => {
        console.error("Error with catching lists: ", error);
      });
  }, [itemCount])


  if (createNewList) {
    return <Navigate to="/create" />
  }

  function delList() {

    Object.keys(isChecked).forEach(function (key) {
      if (isChecked[key]) {
        del(key);
      }
    })

  }

  const del = async (title) => {

    try {
      const res = await axios.post("http://localhost:5001/deleteList", {
        "title": title
      });
      console.log("res" + JSON.stringify(res));
      setItemCount(prev => prev + 1);
    }

    catch (error) {
      console.log("Error when deleting the list: ", error)
    }

  }

  {/* console.log("isChecked: " + JSON.stringify(isChecked)); */ }
  return (
    <>
      <div>

        <Box id="delList">
          <button id="delBtn" onClick={delList} className="colorScheme">DELETE LIST</button>
        </Box>
        <Box id="createLists">
          <button className="colorScheme" onClick={() => setCreateNewList(true)}>Create A New List</button>
        </Box>

        <div id="pageTitle">
          <h2 >Hey Nikki, here's your lists</h2>
        </div>


        <Box>
          <div id="allLists">
            {(Object.keys(data).length === 0) ? (
              <p>Loading...</p>
            ) : (
              Object.entries(data).map(([title, list], i) => (
                <div key={i}>
                  <div>
                    <Checkbox
                      icon={<HeartCheck check={false} />}
                      checkedIcon={<HeartCheck check={true} />}
                      sx={{
                        padding: "4px",
                        "&.Mui-checked": {
                          color: "hotpink"
                        },
                      }}
                      checked={!!isChecked[title]}
                      onChange={handleIsCheckedChange(title)}
                    />
                    <Link to={`/list/${encodeURIComponent(title)}`}>
                      <button className="colorScheme part" ><strong>{title} List: </strong> {list.description}</button>
                    </Link>
                  </div>
                  <br />
                </div>
              ))
            )}
          </div>
        </Box>

      </div>
    </>
  )
}

export default Home
