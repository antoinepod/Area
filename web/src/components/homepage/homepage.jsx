import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import './homepage.scss';
import Cards from './cards/cards.jsx'
import { Link } from 'react-router-dom'
import Areas from "./Areas/Areas";
import { Navigate } from "react-router-dom";
import Header from "../Header/Header";


export default function Homepage({ user, setUser }) {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/auth/me`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.status === 401) {
          window.location.reload()
        }
        setData(() => res.data);
        setUsername(() => res.data.username);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, []);


  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = '/login'
  }


  if (loading) {
    return <div 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#020410",
      height: "100vh"
    }}
    >Loading...</div>
  } else {
    return (
      <div className="homePage">
        <Header/>
        <div className="cardsContainer">
          {
            (data.areas.length !== 0) ?
            data.areas.map((item, n) => {
              return <Areas key={n} action={data.areas[n].action} reaction={data.areas[n].reaction} data={data.areas[n]}/>
            })
            :  <div className="noArea">You don't have any area yet</div>
          }
        </div>
      </div>
    );
  }
}