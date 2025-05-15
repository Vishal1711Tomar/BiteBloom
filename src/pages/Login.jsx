import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/main.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:3001/users");
      const user = res.data.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password &&
          u.role === credentials.role
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Invalid credentials or role.");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            title="Toggle Password"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <select
          name="role"
          className="role-dropdown"
          value={credentials.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
