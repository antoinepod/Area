import React, { useEffect, useState } from "react";
import axios from "axios";
import './homepage.scss';
import Cards from './cards/cards.jsx'
import { Link } from 'react-router-dom'

export default function Homepage() {
  const token = localStorage.getItem("token");


  return (
    <div className="homePage">
      <div className="header">
        <span>AREA</span>
        <button className="fontDifferentPage">Homepage</button>
        <button className="fontDifferentPage" onClick={() => {window.location.href = '/linkpage' }}>Linkpage</button>
        <button className="signOut" onClick={() => { localStorage.clear(); window.location.href = '/login' }}>Sign out</button>
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