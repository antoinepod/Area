import React, {useState, useEffect} from "react";
import './homepage.scss';
// import logo from './logo.png';

export default function homepage() {
  return (
    <div className="navBar">
    {/* <div className="allLogo"> */}
      {/* <img src={logo} alt="logo" width={60}/> */}
      <span className="registerTitle">AREA</span>
    {/* </div> */}
      <div className="backgroundRectangle">
        <span className="registerTitle">Homepage</span>
        <div className="littleSquare">
            <span className="registerTitle">1 :</span>
        </div>
        <div className="font">Description</div>
        <div className="littleSquare">
            <span className="registerTitle">2 :</span>
        </div>
        <div className="font">Description</div>
      </div>
      <button onClick={()=>{localStorage.clear(); window.location.href = '/login'}}>Sign out</button>
    </div>
  )
}