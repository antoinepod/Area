import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { setAuthToken } from '../../utils/setAuthToken';
import './login.scss';
import areaLogo from "./assets/area-logo.png"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/auth/login`, JSON.stringify({ username, password }), { headers: { "Content-Type": "application/json" }})
      .then(res => {
        console.log(res);
        console.log(res.data);
        const token  =  res.data.token;
        localStorage.setItem("token", token);
        setAuthToken(token);
        window.location.href = '/'
      })
      .catch(err => {
        console.log(err.response);
      }
      );
  };

  // const handleGoogleLogin = async googleData => {
  //   const res = await axios.post('http://localhost:8080/api/auth/google', { tokenId: googleData.tokenId });
  //   const data = await res.json()
  //   // store returned user somehow
  // } 

return (
  <div className="login">
    <div className="loginContainer">
      <img src={areaLogo}></img>
      <span>AREA</span>
      <form className="loginForm" onSubmit={handleSubmit}>
      <label>Username</label>
        <input
          className="loginInput"
          type="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
      <label>Password</label>
      <input
        className="loginInput"
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="loginButton" type="submit">
        Login
      </button>
      </form>
      <span className="noAccount">No account yet ? •
      <Link className='link' style={{textDecoration:"none"}} to="/register"> Register</Link>
      </span>
    </div>
  </div>
);
}