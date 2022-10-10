import React, {useEffect, useState} from "react";
import axios from "axios";
import './homepage.scss';
import Cards from './cards/cards.jsx'
import {Link} from 'react-router-dom'

export default function Homepage() {

  return (
    <div className="homePage">
      <div className="header">
        <span>AREA</span>
        <button className="signOut" onClick={()=>{localStorage.clear(); window.location.href = '/login'}}>Sign out</button>
      </div>
      <div className="cardsContainer">
        <Cards title={"YouGram"} action={"Action : Youtube"} reaction={"Reaction : Telegram"}/>
        <Cards title={"TeaGram"} action={"Action : Teams"} reaction={"Reaction : Telegram"}/>
        <Cards title={"WeaGram"} action={"Action : Weather"} reaction={"Reaction : Telegram"}/>
        <Cards title={"TwiGram"} action={"Action : Twitch"} reaction={"Reaction : Telegram"}/>
        <Cards title={"YouTter"} action={"Action : Youtube"} reaction={"Reaction : Twitter"}/>
        <Cards title={"TeaTter"} action={"Action : Teams"} reaction={"Reaction : Twitter"}/>
        <Cards title={"WeaTter"} action={"Action : Weather"} reaction={"Reaction : Twitter"}/>
        <Cards title={"TwiTter"} action={"Action : Twitch"} reaction={"Reaction : Twitter"}/>
        <Cards title={"YouCord"} action={"Action : Youtube"} reaction={"Reaction : Discord"}/>
        <Cards title={"TeaCord"} action={"Action : Teams"} reaction={"Reaction : Discord"}/>
        <Cards title={"WeaCord"} action={"Action : Weather"} reaction={"Reaction : Discord"}/>
        <Cards title={"TwiCord"} action={"Action : Twitch"} reaction={"Reaction : Discord"}/>       
      </div>
    </div>
  );
}