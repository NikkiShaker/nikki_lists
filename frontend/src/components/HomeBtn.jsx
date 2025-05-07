import "../styles/Home.css";
import { Navigate, Link } from "react-router-dom";
import Box from './Box.jsx';
import { useState, useEffect, } from "react";

function HomeBtn() {
    return (
        <div>
            <Link to="/" >
                <Box>
                    <button className="colorScheme btn">
                        HOME
                    </button>
                </Box>
            </Link>
        </div>
    )
}

export default HomeBtn;