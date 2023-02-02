/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import useHttpClient from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useAuth } from "../../shared/context/AuthContext";
import "./userPortal.scss";

function UserPortal() {
  const [isSignUp, setIsSignUp] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState("1");
  const [inputError, setInputError] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const {
    error, isLoading, sendRequest, clearError
  } = useHttpClient();

  const switchMode = (event, value) => {
    if (isSignUp !== value) {
      setIsSignUp(value);
      setIsActive(event.target.getAttribute("data-index"));
    }
  };

  const authenticate = async (email, password, navLocation) => {
    const body = { email, password };
    const headers = {
      "Content-Type": "application/json"
    };
    const response = await sendRequest("http://localhost:3000/api/v1/users/login", "POST", JSON.stringify(body), headers);
    if (response.status === 200) {
      auth.login(response.data.token);
      const { from } = navLocation.state || { from: { pathname: "/" } };
      navigate(from);
    }
  };

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation on the form fields
    if (data.email === "" || data.password === "") {
      // Show an error message if the form is not filled out
      setInputError("Please fill out all fields.");
    } else {
      // Submit the form to the server
      authenticate(data.email, data.password, location);
    }
  };

  if (isLoading) {
    return (
      <DisplayWrapper>
        <LoadingSpinner asOverlay />
      </DisplayWrapper>
    );
  }

  if (error) {
    return (
      <DisplayWrapper>
        <h2>Error</h2>
        <p>{error}</p>
      </DisplayWrapper>
    );
  }

  if (isSignUp) {
    return (
      <DisplayWrapper>
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="user-portal__mode-toggle-container">
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
              className={isActive === "1" ? "active" : undefined}
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
              className={isActive === "1" ? "active" : undefined}
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
