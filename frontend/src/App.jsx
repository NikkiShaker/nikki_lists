import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateList from "./pages/CreateList"
import Home from "./pages/Home"

function App() {
    const [lists, setLists] = useState({});

    return (
        <>
            <div>
                <p>HEY</p>
            </div>
        </>
    )
}

export default App