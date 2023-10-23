import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage]= useState("")

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      navigate("/login");
    }else{
      setErrorMessage("Email Address Already in Use")
    }
  };
  return (
    <div className="col-md-12">
    <div class="container" style={{ width: "50%" }}>
      <h2 class="text-center mb-4">Registration Form</h2>
      <form className="mark" onSubmit={registerHandler}>
        <div class="form-group mb-3">
          <label for="email">Email address:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <small className="text-danger">{errorMessage}</small>
        </div>
        <div class="form-group mb-3">
          <label for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="username">Username:</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter username"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-block"
        >
          Register
        </button>
        <p className="message text-center mt-3">
        Already Registered? <Link to="/login">Login</Link>
      </p>
      </form>
      
    </div>
    </div>
  );
}

export default Register;
