import React, { Component } from "react";
import "../css/styles.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameError: "",
      passwordError: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    if (!username.length) {
      this.setState({ usernameError: "Please provide a username" });
    }
    if (!password.length) {
      this.setState({ passwordError: "Please provide a password" });
    }
    if (username.length & password.length) {
      alert("You are logged on!");
      localStorage.setItem("username", username);
    }
  }

  render() {
    const { usernameError, passwordError, username, password } = this.state;
    console.log(username, password);
    return (
      <div className="wrapper">
        <div className="row">
          <div className="title"> KSL-FE-EXAM </div>
        </div>
        <div className="login-container">
          <div className="login-image">
            <img src="https://via.placeholder.com/400" />
          </div>
          <div className="login-form">
            <div className="row">
              <div className="login-text"> Login</div>
            </div>
            <div className="row">
              <div className="login-form__input">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.onChange}
                  value={username}
                />
                {usernameError && (
                  <div className="error"> {usernameError} </div>
                )}
              </div>
              <div className="login-form__input">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={password}
                />
                {passwordError && (
                  <div className="error"> {passwordError} </div>
                )}
              </div>
              <div className="login-form__input">
                <input
                  type="button"
                  name="submit"
                  value="Login"
                  onClick={this.onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
