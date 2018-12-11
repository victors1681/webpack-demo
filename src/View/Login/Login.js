import React from "react";
import "./Login.scss";

const Login = () => (
  <div className="login-wrapper">
    <input name="user" placeholder="email" />
    <input name="password" placeholder="password" />
    <button>Sign In</button>
  </div>
);

export default Login;
