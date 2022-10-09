import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { setAuthToken } from '../../utils/setAuthToken';

import './login.scss';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/auth/login`, JSON.stringify({ email, password }), { headers: { "Content-Type": "application/json" } })
      .then(res => {
        console.log(res);
        console.log(res.data);
        const token  =  res.data.token;
        localStorage.setItem("token", token);
        setAuthToken(token);
        window.location.href = '/'
      })
      .catch(err => {
        console.log(err.response.data);
      }
      );
  };

return (
  <div className="login">
    <div className="loginContainer">
      <span>AREA</span>
      <form className="loginForm" onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        className="loginInput"
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
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