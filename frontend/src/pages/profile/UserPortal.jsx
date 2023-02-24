/* eslint-disable dot-notation */
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
  const [isActive, setIsActive] = useState("0");
  const {
    error, isLoading, sendRequest, clearError
  } = useHttpClient();

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [inputError, setInputError] = useState({
    email: "",
    password: "",
    confirmPassword: null
  });

  const validateInput = (e) => {
    const { name, value } = e.target;
    setInputError((prev) => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter Email.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : inputError.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      if (typeof error === "string") {
        stateObj["confirmPassword"] = error;
      }

      return stateObj;
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  };

  const switchMode = (index, value) => {
    if (isSignUp !== value) {
      setIsSignUp(value);
      setIsActive(index.toString());
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  const authenticate = async (email, password, navLocation) => {
    const body = { email, password };
    const headers = {
      "Content-Type": "application/json"
    };
    let response;
    if (isSignUp) {
      response = await sendRequest("http://localhost:3000/api/v1/users/", "POST", JSON.stringify(body), headers);
    } else {
      response = await sendRequest("http://localhost:3000/api/v1/users/login", "POST", JSON.stringify(body), headers);
    }

    if (response.status === 200 || response.status === 201) {
      auth.login(response.data.token, response.data.userId);
      const { from } = navLocation.state || { from: { pathname: "/" } };
      navigate(from);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    authenticate(input.email, input.password, location);
  };

  if (isLoading) {
    return (
      <DisplayWrapper>
        <LoadingSpinner asOverlay loadingMessage="Authenticating user, please wait..." />
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

  if (isSignUp === false) {
    return (
      <DisplayWrapper>
        <form onSubmit={handleFormSubmit}>
          <div className="user-portal__mode-toggle-container">
            <button
              data-index={0}
              className={isActive === "0" ? "active" : undefined}
              onClick={() => {
                switchMode(0, false);
              }}
              type="button"
            >
              Login
            </button>
            <button
              data-index={1}
              className={isActive === "1" ? "active" : undefined}
              onClick={() => {
                switchMode(1, true);
              }}
              type="button"
            >
              Sign Up
            </button>

          </div>
          <div className="user-portal__input-container">
            <label className="user-portal__input-label" htmlFor="email">
              <input
                id="email"
                type="email"
                name="email"
                className="user-portal__input-email"
                placeholder="Email Address"
                onChange={onInputChange}
                value={input.email}
                autoComplete="email"
              />
              {inputError.email && <span className="err">{inputError.email}</span>}
            </label>
          </div>
          <div className="user-portal__input-container">
            <label className="user-portal__input-label" htmlFor="password">
              <input
                id="password"
                type="password"
                className="user-portal__input-password"
                name="password"
                placeholder="Enter password"
                onChange={onInputChange}
                value={input.password}
              />
              {inputError.password && <span className="err">{inputError.password}</span>}
            </label>
          </div>
          <div className="user-portal__input-container">
            <button type="submit" className="user-portal__submit-btn">
              Login
            </button>
          </div>
        </form>
        <button
          onClick={handleLogout}
          type="button"
        >
          Logout
        </button>
      </DisplayWrapper>
    );
  }

  if (isSignUp) {
    return (
      <DisplayWrapper>
        <form onSubmit={handleFormSubmit}>
          <div className="user-portal__mode-toggle-container">
            <button
              data-index={0}
              className={isActive === "0" ? "active" : undefined}
              onClick={(event) => {
                switchMode(0, false);
              }}
              type="button"
            >
              Login
            </button>
            <button
              data-index={1}
              className={isActive === "1" ? "active" : undefined}
              onClick={(event) => {
                switchMode(1, true);
              }}
              type="button"
            >
              Sign Up
            </button>
          </div>
          <div className="user-portal__input-container">
            <label htmlFor="email">
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                onChange={onInputChange}
                value={input.email}
              />
              {inputError.email && <span className="err">{inputError.email}</span>}
            </label>
          </div>
          <div className="user-portal__input-container">
            <label htmlFor="password">
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={onInputChange}
                value={input.password}
              />
              {inputError.password && <span className="err">{inputError.password}</span>}
            </label>
          </div>
          <div className="user-portal__input-container">
            <label htmlFor="confirmPassword">
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={onInputChange}
                value={input.confirmPassword}
              />
              {inputError.confirmPassword && <span className="err">{inputError.confirmPassword}</span>}
            </label>
          </div>
          <div className="user-portal__input-container">
            <button type="submit" className="user-portal__submit-btn">
              Sign Up
            </button>
          </div>
        </form>
      </DisplayWrapper>
    );
  }
}

UserPortal.propTypes = {};

export default UserPortal;
