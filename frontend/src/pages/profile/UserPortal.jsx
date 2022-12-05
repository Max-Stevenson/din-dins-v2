import React, { useState } from "react";

function UserPortal() {
  const [isLogin, setIsLogin] = useState(true);

  const switchMode = (value) => {
    if (isLogin !== value) {
      setIsLogin(value);
    }
  };

  if (isLogin) {
    return (
      <form>
        <h3>Login</h3>
        <div>
          <button
            onClick={() => {
              switchMode(true);
            }}
            type="button"
          >
            Login
          </button>
          <button
            onClick={() => {
              switchMode(false);
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
    );
  }

  if (!isLogin) {
    return (
      <form>
        <h3>Sign Up</h3>
        <div>
          <button
            onClick={() => {
              switchMode(true);
            }}
            type="button"
          >
            Login
          </button>
          <button
            onClick={() => {
              switchMode(false);
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
            <input
              type="text"
              id="username"
            />
            Username
          </label>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

UserPortal.propTypes = {};

export default UserPortal;
