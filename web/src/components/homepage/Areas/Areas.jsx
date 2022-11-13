import React, { useState, useEffect } from 'react'
import './Areas.scss'
import axios from 'axios'

function Areas({ action, reaction, data }) {
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (data.status === true) {
            setActive(true)
        }
    }, [])

    const handleClick = () => {
        console.log(data)
        // axios.post(`http://localhost:8080/api/areas/update`, {_id: data._id, status: !active}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        //     .then(res => {
        //         console.log(res)
        //         setActive(!active)
        //     })
        setActive(!active)
    }

    return (
        <div className='areas' onClick={handleClick}>
            <h1 style={{
                color: 'rgba(252,70,107,1)',
            }}>
                {action}
            </h1>
            <h1 style={{
                color: 'rgba(63,94,251,1) ',
            }}>
                {reaction}
            </h1>
            {active ? <span style={{ color: 'green' }}> Active </span> : <span style={{ color: 'red' }}> Inactive </span>}
        </div>
    )
}

export default Areas