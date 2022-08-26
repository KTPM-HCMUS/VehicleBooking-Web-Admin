import React, { useContext, useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import axios from 'axios';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({
    userId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleOnBlur = (event) => {
    const eventName = event.target.name;
    const userInfo = { ...user };
    if (eventName === "userId") {
      userInfo.userId = event.target.value;
    } 
    else if (eventName === "password"){
      userInfo.password = event.target.value;
    }
    setUser(userInfo);
  };

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  async function signIn(){
    const response = await fetch("/login",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user.userId,
        password: user.password
      })
    });
    const json = await response.json();
    if (json){
      if (json.responseInfo.status == 'success'){
        const loggedInUser = {userId: user.userId, password: user.password};
        setLoggedInUser(loggedInUser);
        localStorage.setItem('token', json.result.token);
        history.replace(from);
      }
      else{
        showError('Login failed');
      }
    }
    else {
      showError('Login failed');
    }
  }

  const showError = (error) => {
    const errorMessage = error.message;
    setError(errorMessage);
  };

  const handleLogin = (event) => {
    signIn();
    event.preventDefault();
  };
  return (
    <>
      <div className="container login-page d-flex justify-content-center">
        <div className="login-form">
          <div style={{ border: "1px solid gray", borderRadius: "5px" }}>
            <form className="form-content" onSubmit={handleLogin}>
                <h3 className="mb-4">Admin Login</h3>
                <input type="tel" name="userId" id="" placeholder="Phone" onBlur={handleOnBlur} className="form-input mb-3" required/>
                <input type="password" name="password" id="" placeholder="Password" onBlur={handleOnBlur} className="form-input mb-3" required/>
                <input type="submit" value="Login" className="mb-3 submit-btn"/>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
