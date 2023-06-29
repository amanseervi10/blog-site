import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate=useNavigate();

  const submitHandler=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:3000/register",{
      method:"POST",
      body:JSON.stringify({username,password}),
      headers:{"Content-Type":"application/json"},
    })
    if(response.status===200){
      alert("Registration successful");
      navigate('/login')
    }
    else{
      alert("Registration failed");
    }
  }

  return (
    <form className="login" onSubmit={submitHandler}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button className="button-28" role="button">
        Join
      </button>
    </form>
  );
};

export default RegisterPage;
