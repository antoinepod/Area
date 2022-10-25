import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useJwt } from "react-jwt";
import axios from "axios";

const PrivateRoute = () => {
  let token = localStorage.getItem("token");
//   const {decodedToken, isExpired } = useJwt(token);
  let {isValid, setisValid} = useState(false);

  useEffect(() => {
    axios
      .post(
        `http://localhost:8080/api/auth/isAuthenticated`,
        JSON.stringify({ token }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log("from private Routes", res);
        console.log(res.data);
        setisValid(res.data.auth);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, []);

  return !isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
