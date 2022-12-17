/* eslint-disable quote-props */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import AuthContext from "../../shared/context/AuthContext";

function UserPortal() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const { isLoggedIn, login } = useContext(AuthContext);

  const switchMode = (event, value) => {
    if (isSignUp !== value) {
      setIsSignUp(value);
      setIsActive(event.target.getAttribute("data-index"));
    }
  };

  const authenticate = (email, password) => {
    // Send a request to the server with the username and password
    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      // If the login was successful, redirect the user to the dashboard
      if (response.ok) {
        login();
        window.location.replace("/");
      } else {
        // Otherwise, show an error message
        setError("Invalid username or password.");
      }
    });
  };

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation on the form fields
    if (data.email === "" || data.password === "") {
      // Show an error message if the form is not filled out
      setError("Please fill out all fields.");
    } else {
      // Submit the form to the server
      authenticate(data.email, data.password);
    }
  };

  if (isSignUp) {
    return (
      <DisplayWrapper>
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div>
            <button
              data-index={0}
              className={isActive === "0" ? "active" : undefined}
              onClick={(event) => {
                switchMode(event, true);
              }}
              type="button"
            >
              Login
            </button>
            <button
              data-index={1}
              className={isActive === "0" ? "active" : undefined}
              onClick={(event) => {
                console.log(event);
                // switchMode(event, false);
              }}
              type="button"
            >
              Sign Up
            </button>
          </div>
          <div>
            <label htmlFor="email">
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={changeHandler}
                value={data.email}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <input
                id="password"
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                onChange={changeHandler}
                value={data.password}
              />
              Password
            </label>
          </div>
          <div>
            <label className="custom-control-label" htmlFor="customCheck1">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </DisplayWrapper>
    );
  }

  if (!isSignUp) {
    return (
      <DisplayWrapper>
        <form>
          <h3>Sign Up</h3>
          <div>
            <button
              onClick={(event) => {
                switchMode(event, true);
              }}
              type="button"
            >
              Login
            </button>
            <button
              onClick={(event) => {
                switchMode(event, false);
              }}
              type="button"
            >
              Sign Up
            </button>
          </div>
          <div>
            <label htmlFor="email">
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={changeHandler}
                value={data.email}
              />
              Email address
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={changeHandler}
                value={data.password}
              />
              Password
            </label>
          </div>
          <div>
            <label htmlFor="confirmPassword">
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
              Confirm Password
            </label>
          </div>
          <div>
            <label htmlFor="username">
              <input type="text" id="username" />
              Username
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </DisplayWrapper>
    );
  }
}

UserPortal.propTypes = {};

export default UserPortal;
