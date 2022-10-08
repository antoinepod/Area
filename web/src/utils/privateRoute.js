import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useJwt } from "react-jwt";



const PrivateRoute = () => {
    let token = localStorage.getItem('token');
    const { decodedToken, isExpired } = useJwt(token);


    // const verifyToken = () => {
    //     if (token) {
    //         let decodedToken=jwt.decode(token, {complete: true});
    //         let dateNow = new Date();
    //         return (decodedToken.exp < dateNow.getTime())
    //     }
    //     return false;
    // }

    return(
        !isExpired ? ( <Outlet /> ) : ( <Navigate to="/login" /> )
    )
}

export default PrivateRoute;