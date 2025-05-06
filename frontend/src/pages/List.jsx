import { useState, useEffect, } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate, Link } from "react-router-dom"
import Box from '../components/Box.jsx';
import HomeBtn from '../components/HomeBtn.jsx';
import '../styles/List.css';
import Checkbox from '@mui/material/Checkbox';
import { HeartCheck } from "../components/HeartCheck.jsx";

function List() {
    const [listData, setListData] = useState(null);
    const { listTitle } = useParams();
    // We don't actually need to count anything, this is to trigger the useEffect so that the list will be updated when we add a new item
    // This way we won't need to manually refresh it when we want to add a new item
    const [itemCount, setItemCount] = useState(0);

    // For adding a new item in the list
    const [nameInput, setNameInput] = useState("");
    const [dueDateInput, setDueDateInput] = useState("");
    const [isDone, setIsDone] = useState(false);

    // Handles when there's changes made to the items
    const handleNameChange = (event) => {
        setNameInput(event.target.value);
    };

    const handleDueDateChange = (event) => {
        setDueDateInput(event.target.value);
    };

    const handleIsDoneChange = (event) => {
        setIsDone(event.target.checked);
    };

    // Function adds a new item to the list
    const addItem = async () => {
        try {
            const response = await axios.post("http://localhost:5001/add", {
                title: listTitle,
                itemName: nameInput,
                dueDate: dueDateInput,
                done: isDone
            });
            console.log("create response: ", response.data);

            setNameInput(""); // Clear title input textbox
            setDueDateInput(""); // Clear due date input textbox
            setIsDone(false); // Change checkbox to unchecked
            setItemCount(prev => prev + 1);
        }
        catch (error) {
            console.log("Error creating list: " + error)
        }
    }

    useEffect(() => {

        axios.post("http://localhost:5001/getList", { title: listTitle })
            .then(res => {
                setListData(res.data)
                console.log("res.data: " + JSON.stringify(res.data));
            })
            .catch(error => {
                console.log("Error with catching lists", error);
            });

    }, [listTitle, itemCount])

    if (!listData) return < p > LOADING LIST...</p >;

    return (
        <>
            <div className="parent">
                <div id="home">
                    <HomeBtn />
                </div>
                <div id="list" >
                    <h2>{listTitle} List: </h2>
                    <p>DESCRIPTION: {listData.description}</p>

                    {listData.items && Object.entries(listData.items).length > 0 ? ( // Making sure the there are items in the list that exist
                        <ul id="items">
                            {Object.entries(listData.items).map(([itemName, itemData]) => ( // Taking the title and data of each list item
                                <li key={itemData.id}> {/* Look up wtf this line does */}
                                    <div className="itemHeader">

                                        <Checkbox
                                            icon={<HeartCheck check={false} />}
                                            checkedIcon={<HeartCheck check={true} />}
                                            sx={{
                                                padding: "4px",
                                                "&.Mui-checked": {
                                                    color: "hotpink"
                                                },
                                            }}
                                        />
                                        <strong>{itemName}</strong>
                                    </div>

                                    <ul className="itemDetails">
                                        <li>DUE ON: {itemData.dueDate}</li>
                                        <li>{itemData.done ? "you've completed it!! YAY" : "girl, get to work"}</li>
                                    </ul>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>EMPTY LIST</p>
                    )}
                </div>
                <div id="remove" className="part">
                    <button id="removeBtn">REMOVE ITEM</button>
                </div>
                <div id="box-container" className="part">

                    <Box id="addBox">

                        <h2>Add Item</h2>

                        <p>
                            TITLE:
                            <input type="text" style={{ width: "23.5vh" }} value={nameInput} onChange={handleNameChange} />
                        </p>

                        <p>
                            <label htmlFor="due-date">Due Date: </label>
                            <input id="due-date" type="date" style={{ width: "23.5vh" }} value={dueDateInput} onChange={handleDueDateChange} />
                        </p>

                        <p>
                            Completed?
                            <Checkbox
                                icon={<HeartCheck check={false} />}
                                checkedIcon={<HeartCheck check={true} />}
                                sx={{
                                    padding: "4px",
                                    "&.Mui-checked": {
                                        color: "hotpink"
                                    },
                                }}

                                checked={isDone}
                                onChange={handleIsDoneChange}
                            />
                        </p>

                        <button onClick={addItem}>ADD NEW ITEM</button>
                    </Box>
                </div>

            </div >
        </>
    )
}

export default List