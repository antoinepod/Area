import React, { useState, useEffect } from 'react'
import './Areas.scss'
import axios from 'axios'
import poubelle from './assets/poubelle.png'

function Areas({ action, reaction, data , refresh, setRefresh}) {
    const [active, setActive] = useState(data.status)
    const username = localStorage.getItem("user");	
    useEffect(() => {
        if (data.status === true) {
            setActive(true)
        }
    }, [])

    const handleClick = () => {
        // console.log(data)
        axios.post(`http://localhost:8080/api/area/update`, {'username': username, '_id': data._id, status: !active}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                console.log(res)
                setActive(!active)
            })
        setActive(!active)
    }


    const deleteArea = () => {
        axios({
            method: 'delete',
            url: "http://localhost:8080/api/area/delete",
            data: {
              "username":username,
              "_id": data._id
            }
          }).then(res => {
            setRefresh((curr)=> !curr)
            console.log(res)
        })
    }

    return (
        <div className='areas' >
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
            {active ? <div onClick={handleClick} style={{ color: 'green', justifySelf: 'end'}}> Active </div> : <div onClick={handleClick} style={{ color: 'red' }}> Inactive </div>}
            <i style={{size:'30px'}} className="fa-solid fa-trash" onClick={deleteArea}></i>
        </div>
    )
}

export default Areas