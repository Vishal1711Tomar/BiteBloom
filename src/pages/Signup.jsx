import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/main.css";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailOrPhone: "",
    username: "",
    password: "",
    role: "", // Empty by default
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:3001/users");
      const existing = res.data.find(
        (u) => u.username.toLowerCase() === formData.username.toLowerCase()
      );

      if (existing) {
        alert("Username already exists!");
        return;
      }

      await axios.post("http://localhost:3001/users", {
        id: Date.now(),
        ...formData,
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Signup error", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Mobile"
          required
          onChange={handleChange}
        />
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
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
