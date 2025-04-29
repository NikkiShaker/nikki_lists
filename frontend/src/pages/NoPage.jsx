import { useState } from 'react'
import axios from 'axios';

function NoPage() {
    const [lists, setLists] = useState({});

    return (
        <>
            <div>
                <p>ERROR 404: PAGE NOT FOUND </p>
                <p>{":("}</p>
            </div>
        </>
    )
}

export default NoPage