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
  const [dataAction, setDataAction] = useState([]);
  const [dataReaction, setDataReaction] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
    <div className="createPage">
      <Header/>
      <div className="cardsContainer">
        <form className="createpageForm" onSubmit={handleSubmit}>
        <label style={{
          color: "white",
        }}>
        Choose your Action
          <select value={action} onChange={(e)=>{setAction(e);
            e.preventDefault();}}>
            <option value="A youtuber posts a new video">Get Last video from Youtube channel</option>
            <option value="Get last race results">Result Of the latest F1 race </option>
            <option value="Astronomy picture of the day is available">Get the picture of the day from the NASA</option>
            <option value="It starts/stops freezing">Be aware when the temperature is below 0 degree</option>
            <option value="It starts/stops raining">Be aware when it's raining in your city </option>
            {/* <option value=""></option> */}
          </select>
        </label>
        <label style={{
          color: "white",
        }}>
        Choose your Reaction
          <select value={reaction} onChange={(e)=>setReaction(e)}>
            <option value="Send you a private message">Get private message on Discord</option>
            <option value="Area's bot sends you a message">Get private message on Telegram</option>
            <option value="Send a message in the general channel with your @"></option>
            <option value=""></option>
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
