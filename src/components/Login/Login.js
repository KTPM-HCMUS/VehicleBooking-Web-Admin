import React, { useContext, useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

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

  const logIn = (userCredential) => {
    const { email } = userCredential.user;
    const displayName = user.name;
    const signedInUser = { name: displayName, email };
    setLoggedInUser(signedInUser);
    history.replace(from);
  };

  const showError = (error) => {
    const errorMessage = error.message;
    setError(errorMessage);
  };

  const handleLogin = (event) => {
      fetch("http://34.121.234.226:8080/login", {
        method: "POST",
        mode: 'no-cors',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          'userId': user.userId,
          'password': user.password
        })
      }).then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error)
        showError(error);
      });
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
