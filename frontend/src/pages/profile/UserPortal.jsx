import React, { useState } from "react";
import DisplayWrapper from "../../shared/components/DisplayWrapper";

function UserPortal() {
  const [isLogin, setIsLogin] = useState(true);
  const [isActive, setIsActive] = useState(0);

  const switchMode = (value, event) => {
    if (isLogin !== value) {
      setIsLogin(value);
      setIsActive(event.taget.getAttribute("data-index"));
    }
  };

  if (isLogin) {
    return (
      <DisplayWrapper>
        <form>
          <h3>Login</h3>
          <div>
            <button
              data-index={0}
              className={isActive === "0" ? "active" : undefined}
              onClick={() => {
                switchMode(true);
              }}
              type="button"
            >
              Login
            </button>
            <button
              data-index={1}
              className={isActive === "0" ? "active" : undefined}
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
      </DisplayWrapper>
    );
  }

  if (!isLogin) {
    return (
      <DisplayWrapper>
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
