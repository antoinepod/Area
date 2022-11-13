import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import './homepage.scss';
import Cards from './cards/cards.jsx'
import { Link } from 'react-router-dom'


export default function Homepage({ user, setUser }) {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/auth/me`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.status === 401) {
          window.location.reload()
        }
        setData(() => res.data);
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

  {/*window.location.href = '/login'*/ }

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="homePage">
        <div className="header">
          <span className="title">{!loading && data.username.slice(0, 7)}</span>
          <button className="fontDifferentPage">Homepage</button>
          <button className="fontDifferentPage" onClick={() => { window.location.href = '/createpage' }}>Create action</button>
          <button className="fontDifferentPage" onClick={() => { window.location.href = '/linkpage' }}>Link account</button>
          <button className="signOut" onClick={() => { localStorage.clear(); window.location.href = '/login' }}>Sign out</button>
        </div>
        <div className="cardsContainer">
          
          {/* <Cards title={"Service"} action={"Choose your service"} cards={"Youtube"} cards2={"Weather"} cards3={"Formule 1"} cards4={"NASA"}/>
        <Cards title={"Action"} action={"Choose your action"}/>
        <Cards title={"Service"} action={"Choose your service"} cards={"Telegram"} cards2={"Discord"}/>
        <Cards title={"Reaction"} action={"Choose your reaction"}/> */}
        </div>
      </div>
    );
  }
}