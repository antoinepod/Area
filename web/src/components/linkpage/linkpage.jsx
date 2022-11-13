import React, { useEffect, useState } from "react";
import axios from "axios";
import './linkpage.scss';
import Cards from './../homepage/cards/cards.jsx'
import { Link } from 'react-router-dom'
import Slideshow from "./slide/slide";
import navbarLogo from "./assets/navbar-logo.png"
import Header from "../Header/Header";
export default function Linkpage() {
  const token = localStorage.getItem("token");

  return (
    <div className="linkPage">
      <Header/>
      <div className="cardsContainer">
        <div className="font">Link Your Accounts</div>
        <Slideshow/>
      </div>
    </div>
  );
}