import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RegisterWrapper, RegisterCard } from "./styledComponents";

class Register extends Component {
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
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      this.setState({ message: data.message });

    } catch (error) {
      this.setState({ message: "Server Error ❌" });
    }
  };

  render() {
    const { email, password, message } = this.state;

    const isSuccess = message.includes("Successfully");

    return (
      <RegisterWrapper>
        <RegisterCard className="card shadow p-4">
          <h3 className="text-center text-primary mb-4">
            Create Account
          </h3>

          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          {message && (
            <div
              className={`alert mt-3 text-center ${
                isSuccess ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          <p className="text-center mt-3">
            Already registered?{" "}
            <Link to="/" className="text-decoration-none">
              Login
            </Link>
          </p>
        </RegisterCard>
      </RegisterWrapper>
    );
  }
}

export default Register;