import React, { useEffect, useState } from "react";
import axios from "axios";
import './linkpage.scss';
import Cards from './../homepage/cards/cards.jsx'
import { Link } from 'react-router-dom'
// import Slideshow from "./slide/slide";

export default function Linkpage() {
  const token = localStorage.getItem("token");

  return (
    <div className="linkPage">
      <div className="header">
        <span>AREA</span>
        <button className="fontDifferentPage" onClick={() => {window.location.href = '/' }}>Homepage</button>
        <button className="fontDifferentPage" >Linkpage</button>
        <button className="signOut" onClick={() => { localStorage.clear(); window.location.href = '/login' }}>Sign out</button>
      </div>
      <div className="cardsContainer">
          {/* <Slideshow/> */}
      </div>
    </div>
  );
}