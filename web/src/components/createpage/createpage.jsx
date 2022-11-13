import React, { useEffect, useState } from "react";
import axios from "axios";
import './createpage.scss';
import Cards from './../homepage/cards/cards.jsx'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import Header from "../Header/Header";

export default function Createpage({data}) {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [action, setAction] = useState("");
  const [reaction, setReaction] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
    <div className="createPage">
      <Header/>
      <div className="cardsContainer">
        <form className="createpageForm" onSubmit={handleSubmit}>
        <label>
        Choose your Action
          <select value={action} onChange={(e)=>setAction(e)}>
            <option value="">Get Last video from Youtube channel</option>
            <option value="">Result Of the latest F1 race </option>
            <option value=""></option>
            <option value=""></option>

          </select>
        </label>
        </form>
      </div>
    </div>
  );
}

//  <div className="createPage">
{/* <Header/>
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
</div> */}
