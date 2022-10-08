import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './register.scss';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const user = {
        email: email,
        password: password,
      };

      axios.post(`http://localhost:8080/api/auth/signup`, JSON.stringify({ email, password }), { headers: { "Content-Type": "application/json" } })
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
      {/* <span className="registerTitle">Register</span> */}
      <span className="registerTitle">AREA</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
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
        <Link className="link" style={{textDecoration:"none", color:"white"}} to="/login"> Login</Link>
      </span>
      </div>
    </div>
  );
}