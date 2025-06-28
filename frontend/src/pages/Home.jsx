import React, { useState, useEffect } from 'react'
import { Navigate, Link } from "react-router-dom"
import axios from 'axios';
import Box from '../components/Box.jsx';
import CreateList from './CreateList';
import '../styles/Home.css';

//For Delete PopUp:
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// For Heart Checkbox
import Checkbox from '@mui/material/Checkbox';
import { HeartCheck } from "../components/HeartCheck.jsx";

function Home() {
  const [data, setData] = useState({});
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [createNewList, setCreateNewList] = React.useState(false);
  const [isChecked, setIsChecked] = useState({}); // For checkboxes
  const [isPopupOpen, setPopupOpen] = useState(false); // popup for if you wanna delete a list
  const [yesDel, setYesDel] = useState(false);

  // This way we won't need to manually refresh it when we want to add a new item
  const [itemCount, setItemCount] = useState(0);

  const handleIsCheckedChange = (title) => (event) => {
    setIsChecked(prev => ({
      ...prev,
      [title]: event.target.checked
    }));
  };

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

    setPopupOpen(true);

  }

  const del = async (title) => {

    try {
      const res = await axios.post("http://localhost:5001/deleteList", {
        "title": title
      });
      console.log("res" + JSON.stringify(res));
      setIsChecked({})
      setItemCount(prev => prev + 1);
    }

    catch (error) {
      console.log("Error when deleting the list: ", error)
    }

  }

  const handleClose = () => {
    document.activeElement?.blur(); // Remove focus from the button
    setPopupOpen(false);
  };

  const noItemsSelected = !Object.values(isChecked).some(val => val);

  return (
    <>
      <div>

        <Box id="delList">
          <button id="delBtn" onClick={delList} className="colorScheme btn">DELETE LIST</button>
        </Box>
        <Box id="createLists">
          <button className="colorScheme btn" onClick={() => setCreateNewList(true)}>Create A New List</button>
        </Box>

        <div className="centerPage">
          <div id="pageTitle"> {/*className="bounce">*/}
            <h2>Hey Nikki, here's your lists</h2>
          </div>
        </div>

        <div className="centerPage slideList">
          <Box style={{ backgroundColor: "white" }}>
            <Box >
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
                          <button className="colorScheme part btn" ><strong>{title} List: </strong> {list.description}</button>
                        </Link>
                      </div>
                      <br />
                    </div>
                  ))
                )}
              </div>
            </Box>
          </Box>
        </div>

        <Dialog open={isPopupOpen} onClose={() => setPopupOpen(false)} >

          <div className="colorScheme" style={{ padding: '1rem' }}>

            <p>Are you sure you want to delete the lists?</p>
            <button className="yesBtn btn" onClick={() => {

              Object.keys(isChecked).forEach(function (key) {
                if (isChecked[key]) {
                  del(key);
                }
              })
              setPopupOpen(false);

            }} disabled={noItemsSelected}>Yes</button>
            <button className="noBtn btn" onClick={handleClose}>No</button>

          </div>

        </Dialog>

      </div>
    </>
  )
}

export default Home

