import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './register.scss';

export default function Register() {
  const [username, setUsername] = useState("");
  // const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const user = {
        username: username,
        password: password,
      };

      axios.post(`http://localhost:8080/api/auth/signup`, JSON.stringify({ username, password }), { headers: { "Content-Type": "application/json" } })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.response.data); 
        }
        );
        localStorage.setItem("userInfo", JSON.stringify(user));
        window.location.href = '/login'
    }
  };

  return (
    <div className="register">
      <div className="registerContainer">
        <span>AREA</span>
        <form className="registerForm" onSubmit={handleSubmit}>
        <label>username</label>
        <input
          className="registerInput"
          type="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
        </form>
        <span className="haveAnAccount">Already have an account ? • 
        <Link className="link" style={{textDecoration:"none"}} to="/login"> Login</Link>
        </span>
      </div>
    </div>
  );
}