import React, { useEffect, useState } from "react";
import axios from "axios";
import './linkpage.scss';
import Cards from './../homepage/cards/cards.jsx'
import { Link } from 'react-router-dom'
import Slideshow from "./slide/slide";
import navbarLogo from "./assets/navbar-logo.png"

export default function Linkpage() {
  const token = localStorage.getItem("token");

  return (
    <div className="linkPage">
      <div className="header">
        {/* <img src={navbarLogo}></img> */}
        <span>AREA</span>
        <button className="fontDifferentPage" onClick={() => {window.location.href = '/' }}>Homepage</button>
        <button className="fontDifferentPage" onClick={() => {window.location.href = '/createpage' }}>Create action</button>
        <button className="fontDifferentPage" >Link account</button>
        <button className="signOut" onClick={() => { localStorage.clear(); window.location.href = '/login' }}>Sign out</button>
      </div>
      <div className="cardsContainer">
        <div className="font">Link Your Accounts</div>
        <Slideshow/>
      </div>
    </div>
  );
}