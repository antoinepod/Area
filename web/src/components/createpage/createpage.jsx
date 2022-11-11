import React, { useEffect, useState } from "react";
import axios from "axios";
import './createpage.scss';
import Cards from './../homepage/cards/cards.jsx'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom/client';

export default function Createpage() {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
    <div className="createPage">
      <div className="header">
        <span>AREA</span>
        <button className="fontDifferentPage" onClick={() => {window.location.href = '/' }}>Homepage</button>
        <button className="fontDifferentPage">Create action</button>
        <button className="fontDifferentPage" onClick={() => {window.location.href = '/linkpage' }}>Link account</button>
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
        <Cards title={"Service"} action={"Choose your service"} cards={"Youtube"} cards2={"Weather"} cards3={"Formule 1"} cards4={"NASA"}/>
        <Cards title={"Action"} action={"Choose your action"}/>
        <Cards title={"Service"} action={"Choose your service"} cards={"Telegram"} cards2={"Discord"}/>
        <Cards title={"Reaction"} action={"Choose your reaction"}/>
        <form className="createpageForm" onSubmit={handleSubmit}>
            <input 
                className="createpageInput"
                type="text" 
                value={name}
                placeholder="Name your action"
                onChange={(e) => setName(e.target.value)}
            />
            <button className="createpageButton" type="submit">
                Submit
            </button>
        </form>
      </div>
    </div>
  );
}