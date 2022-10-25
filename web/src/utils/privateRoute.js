import React, {useEffect} from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useJwt } from "react-jwt";
import axios from 'axios';


const PrivateRoute = () => {
    let token = localStorage.getItem('token');
    const { valid, setValid } = false;

    useEffect(() => {
        axios.post(`http://localhost:8080/api/auth/isAuthenticated`, JSON.stringify({token}), { headers: { "Content-Type": "application/json" } })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.response.data);
        }
        );
    }, []);

    return(
        !valid ? ( <Outlet /> ) : ( <Navigate to="/login" /> )
    )
}

export default PrivateRoute;