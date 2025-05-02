import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom"
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
                <p>HEY THIS IS THE CREATE PAGE</p>

                <p>Name of List: </p>
                <input type="text" value={titleInput} onChange={handleTitleChange} /><br />

                <p>Description: </p>
                <input type="text" value={descInput} onChange={handleDescChange} /><br /><br />

                <button onClick={createList}>Create New List</button>
            </div>
        </>
    )
}

export default CreateList