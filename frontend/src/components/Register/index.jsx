import React, { Component } from "react";
import { Link } from "react-router-dom";

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

    return (
      <div>
        <h2>Register</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Enter Email"
            required
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Enter Password"
            required
          />

          <button type="submit">Register</button>
        </form>

        {message && <p>{message}</p>}

        <p>
          Already registered? <Link to="/">Login</Link>
        </p>
      </div>
    );
  }
}

export default Register;