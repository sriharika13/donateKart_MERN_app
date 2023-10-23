import React from "react";
import { useState } from "react";
import { Link , useNavigate} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate= useNavigate()
  const loginHandler=async(e)=>{
    e.preventDefault()
    const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email, password
      })
    })
    const data= await response.json()
    if(data.user!==false){
        localStorage.setItem('token', data.user)
        navigate('/')
    }else{
        setErrorMessage("Username Or Email Is Wrong")
    }
  }
  return (
    <div className="col-md-12">
    <div className="container"  style={{ width: "50%" }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={loginHandler} className="mark">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <small class="form-text text-danger">{errorMessage}</small><br></br>
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <p className="message text-center mt-3">
                Not Registered? <Link to="/register">Register Now!</Link>
            </p>
        </form>
    </div>
</div>


  );
}

export default Login;