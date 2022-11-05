import React, { useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from "axios";


const PrivateRoute = () => {
  let token = localStorage.getItem("token");

  return  token ? <Outlet/> : <Navigate to="/login"/>;
  
};


// const PrivateRoute = () => {
//   let token = localStorage.getItem("token");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.post(
//                 `http://localhost:8080/api/auth/isAuthenticated`,
//                 JSON.stringify({ token }),
//                 { headers: { "Content-Type": "application/json" } }
//               )
//         if (response.data.auth === "true" && token) {
//           setLoading(false);

//         } else {
//           setLoading(true);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
    
    
//     checkAuth();
//   }, []);
//   if (loading)
//       return null;

//   //create a function to check if the api allow the token

//   return  loading ? <Navigate to="/login"/>:  <Outlet/>;
// };

export default PrivateRoute;
