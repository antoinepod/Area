import React, {useState} from "react";
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
      alert("Success");
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Confirm your password..."
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="loginButton">Login</button>
    </div>
  );
}