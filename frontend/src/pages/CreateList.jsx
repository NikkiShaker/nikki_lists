import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom"
import Box from '../components/Box.jsx';
import HomeBtn from '../components/HomeBtn.jsx';
import '../styles/CreateList.css';
import '../styles/Home.css';
import axios from 'axios';

function CreateList() {
    const [lists, setLists] = useState({});
    const [titleInput, setTitleInput] = useState("");
    const [descInput, setDescInput] = useState("");
    const [backToHome, setBackToHome] = React.useState(false);

    const handleTitleChange = (event) => {
        setTitleInput(event.target.value);
    };

    const handleDescChange = (event) => {
        setDescInput(event.target.value);
    };


    // Function that creates a new list
    const createList = async () => {
        try {
            const response = await axios.post("http://localhost:5001/create", {
                title: titleInput,
                description: descInput
            });
            //console.log("create response: ", response.data);

            setTitleInput(""); // Clear title input textbox
            setDescInput(""); // Clear description input textbox as well
            setBackToHome(true);
        }
        catch (error) {
            console.log("Error creating list: " + error)
        }
    }

    // 
    if (backToHome) {
        return <Navigate to="/" />
    }

    return (
        <>
            <div>
                <div className="home" >
                    <HomeBtn />
                </div>

                <div className="createBox">

                    <Box style={{ backgroundColor: "#FFC0CB" }}>
                        <Box style={{ backgroundColor: "white" }}>
                            <h2 style={{ color: "#FFC0CB" }}>CREATE A NEW LIST</h2>

                            <p style={{ color: "black" }}>Name of List: </p>
                            <input type="text" value={titleInput} onChange={handleTitleChange} style={{ backgroundColor: "#FFC0CB", color: "black" }} /><br />

                            <p style={{ color: "black" }}>Description: </p>
                            <input type="text" value={descInput} onChange={handleDescChange} style={{ color: "black", backgroundColor: "#FFC0CB" }} /><br /><br />

                            <button className="createBtn btn" onClick={createList}>CREATE</button>
                        </Box>
                    </Box>

                </div>

            </div>
        </>
    )
}

export default CreateList