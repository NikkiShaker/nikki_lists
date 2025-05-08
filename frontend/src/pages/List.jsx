import { useState, useEffect, } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate, Link } from "react-router-dom"
import Box from '../components/Box.jsx';
import HomeBtn from '../components/HomeBtn.jsx';

//For Delete PopUp:
import Dialog from '@mui/material/Dialog';

import '../styles/List.css';
import '../styles/Home.css';

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

    // Keeps list of checked items
    const [checkedList, setCheckedList] = useState({});

    // Keeps list of clicked items so we know which ones we want to delete
    const [itemsClicked, setItemsClicked] = useState({});

    // For delete popup
    const [isPopupOpen, setPopupOpen] = useState(false); // popup for if you wanna delete a list

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

    // For when you completed an item on the list
    const handleCheckedListChange = (itemName) => async (event) => {

        const updatedCheck = event.target.checked;
        setCheckedList(prev => ({
            ...prev,
            [itemName]: updatedCheck
        }));

        // console.log("updatedCheck: " + JSON.stringify(updatedCheck))

        try {
            const response = await axios.post("http://localhost:5001/itemCompleted", {
                title: listTitle,
                itemName: itemName,
                done: updatedCheck
            });
            // console.log("create response: ", response.data);

            setItemCount(prev => prev + 1);
        }
        catch (error) {
            console.log("Error creating list: " + error)
        }

    };

    // For when you want to delete the list item(s)
    const handleItemsClickedChange = (title) => (event) => {
        setItemsClicked(prev => ({
            ...prev,
            [title]: event.target.value
        }))
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


    // Deletes item(s) from the list
    const removeItem = async () => {

        for (const [item] of Object.entries(itemsClicked)) {
            if (itemsClicked[item]) {
                try {
                    const response = await axios.post("http://localhost:5001/removeItem", {
                        title: listTitle,
                        itemName: item
                    });
                    console.log("create response: ", response.data);
                    setItemsClicked({});
                    setItemCount(prev => prev + 1);
                }
                catch (error) {
                    console.log("Error creating list: " + error)
                }
            }
        }

    }


    // This closes the popup once the user has decided whether or not to delete the items in the list
    const handleClose = () => {
        document.activeElement?.blur(); // Remove focus from the button
        setPopupOpen(false);
    };


    //
    const noItemsSelected = !Object.values(itemsClicked).some(val => val);

    // Getting data for the list being displayed
    useEffect(() => {

        axios.post("http://localhost:5001/getList", { title: listTitle })
            .then(res => {
                setListData(res.data)
                //console.log("res.data: " + JSON.stringify(res.data));

                const initialChecks = {};

                Object.entries(res.data.items).forEach(([itemName, item]) => {
                    initialChecks[itemName] = item.done;
                    //console.log(itemName + ": " + itemsClicked[itemName])
                });

                setCheckedList(initialChecks);

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
                <Box className="list" style={{ width: "100vw", backgroundColor: "white" }}>
                    <Box style={{ width: "100%", color: "white", backgroundColor: "#FFC0CB" }}>
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
                                                checked={!!checkedList[itemName]}
                                                onChange={handleCheckedListChange(itemName)}
                                            />

                                            <button onClick={
                                                (() => {

                                                    setItemsClicked(prev => ({
                                                        ...prev,
                                                        [itemName]: !prev[itemName]
                                                    }))

                                                    setItemCount(prev => prev + 1);

                                                })
                                            } style={{ color: itemsClicked[itemName] ? "#FFC0CB" : "#ffffff", backgroundColor: itemsClicked[itemName] ? "#000000" : "#FFC0CB" }}><strong>{itemName}</strong></button>
                                        </div>

                                        <ul className="itemDetails">
                                            {itemData.dueDate && <li style={{ position: "relative", left: "2.2vw" }}>DUE ON: {itemData.dueDate}</li>}
                                        </ul>

                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>EMPTY LIST</p>
                        )}

                    </Box>
                </Box>

                <div id="remove">
                    <Box >
                        <button id="removeBtn" className="colorScheme btn" onClick={setPopupOpen}>REMOVE ITEM</button>
                    </Box>
                </div>

                <div id="box-container">
                    <Box style={{ backgroundColor: "#FFC0CB" }}>

                        <Box id="addBox" style={{ color: "#FFC0CB", backgroundColor: "white" }}>

                            <h2>Add Item</h2>

                            <p style={{ color: "black" }}>
                                TITLE:
                                <input type="text" style={{ width: "23.5vh", backgroundColor: "#FFC0CB", color: "black" }} value={nameInput} onChange={handleNameChange} />
                            </p>

                            <p style={{ color: "black" }}>
                                <label htmlFor="due-date">Due Date: </label>
                                <input id="due-date" type="date" style={{ width: "23.5vh", backgroundColor: "#FFC0CB", color: "black" }} value={dueDateInput} onChange={handleDueDateChange} />
                            </p>

                            <p style={{ color: "black" }}>
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

                            <button className="addBtn btn" onClick={addItem} >ADD NEW ITEM</button>
                        </Box>
                    </Box>
                </div>

                <Dialog open={isPopupOpen} onClose={() => setPopupOpen(false)} >

                    <div className="colorScheme" style={{ padding: '1rem' }}>

                        <p>Are you sure you want to delete the item{"(s)"}?</p>
                        <button className="yesBtn btn" onClick={() => {

                            removeItem();
                            setPopupOpen(false);

                        }} disabled={noItemsSelected} style={{ position: "relative", left: "5.5vw" }} >Yes</button>

                        <button className="noBtn btn" onClick={handleClose} style={{ position: "relative", left: "6.9vw" }}>No</button>

                    </div>

                </Dialog>
            </div >
        </>
    )
}

export default List