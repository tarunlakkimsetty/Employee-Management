import React, { Component } from "react";
import { LoginBackground, LoginCard } from "./styledComponents";
import { Link } from "react-router-dom";
import { withRouter } from "../WithRouter.jsx";

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      message: ""
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        this.props.navigate("/home"); // Redirect
      } else {
        this.setState({ message: data.message });
      }

    } catch (error) {
      this.setState({ message: "Server Error" });
    }
  };

  render() {
    const { email, password, message } = this.state;

    return (
      <LoginBackground>
        <LoginCard className="card shadow p-4">
          <h3 className="text-center text-primary mb-4">Login</h3>

          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100">
              Login
            </button>
          </form>

          {message && (
            <div className="alert alert-danger mt-3 text-center">
              {message}
            </div>
          )}

          <p className="text-center mt-3">
            New user? <Link to="/register">Register</Link>
          </p>
        </LoginCard>
      </LoginBackground>
    );
  }
}

export default withRouter(Login);