import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import './homepage.scss';
import Cards from './cards/cards.jsx'
import { Link } from 'react-router-dom'
import { UserContext } from '../../utils/userContext';


export default function Homepage() {
  const [userContext, setUserContext] = useContext(UserContext)
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/auth/user`, { headers: { "Authorization": `Bearer ${token}` }})
      .then(res => {
      console.log(res);
      console.log(res.data);
      if (res.status === 401) {
        // Edge case: when the token has expired.
        // This could happen if the refreshToken calls have failed due to network error or
        // User has had the tab open from previous day and tries to click on the Fetch button
        window.location.reload()
      } else {
      setUserContext(current => {
        return { ...current, user: res.data }
      }
    )}})
  }, [])

    const logoutHandler = () => {
      axios.get(`http://localhost:8080/api/auth/logout`, { headers: { "Authorization": `Bearer ${token}` }})
      .then(async response => {
        setUserContext(oldValues => {
          return { ...oldValues, details: undefined, token: null }
        })
        window.localStorage.setItem("logout", Date.now())
      })
    }
 {/*window.location.href = '/login'*/}
  return (
    <div className="homePage">
      <div className="header">
        <span>AREA</span>
        <button className="fontDifferentPage">Homepage</button>
        <button className="fontDifferentPage" onClick={() => {window.location.href = '/linkpage' }}>Linkpage</button>
        <button className="signOut" onClick={ logoutHandler }>Sign out</button>
        {/* <button onClick={() => axios.post(`http://localhost:8080/api/auth/isAuthenticated`, JSON.stringify({ token }), { headers: { "Content-Type": "application/json" } })
          .then(res => {
            console.log("token",token);
            console.log("from private Routes", res);
            console.log(res.data);
          })
          .catch(err => {
            console.log("token",token);
            console.log("from private Routes", err);
            // console.log(err.response.data);
          }
          )
          }> check jwt </button> */}
      </div>
      <div className="cardsContainer">
        <Cards title={"Device"} action={"Choose your device"}/>
        <Cards title={"Action"} action={"Choose your action"}/>
        <Cards title={"Device"} action={"Choose your device"}/>
        <Cards title={"Reaction"} action={"Choose your reaction"}/>
      </div>
    </div>
  );
}