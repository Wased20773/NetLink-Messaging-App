import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = ({ toggleForm }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { setUser } = ChatState();

  const submitHandler = async (e) => {
    // Remove later when moving to the next page
    e.preventDefault();
    setLoading(true);

    console.log("----- Logging in with creditials -----");
    console.log(" Email: ", email);
    console.log(" Password: ", password);

    if (!email || !password) {
      console.warn("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );

      console.log("Login Successful");
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={submitHandler}>
      <div className="button-group">
        <input className="form-button" type="button" value="Login" />
        <input
          className="form-button"
          type="button"
          value="Signup"
          onClick={toggleForm}
        />
      </div>

      {/* Email */}
      <input
        className="signup-input-field"
        type="text"
        name="email"
        id="email"
        placeholder="Email Address*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password */}
      <div className="password-container">
        <input
          className="signup-input-field"
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "hide" : "show"}
        </span>
      </div>

      {/* Signin Button */}
      <div className="button-group">
        <button
          data-testid="login-button"
          name="login"
          className="submit-button"
          type="submit"
          value="Login"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Login;
