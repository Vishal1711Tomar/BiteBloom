import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/main.css";
import logo from "../assets/logo.png";
import { SearchContext } from "../context/SearchContext"; 

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/"); // Redirect to homepage where filtering happens
  };

  return (
    <nav className="navbar">
      
      <div className="navbar-left" onClick={() => navigate("/")}>
        <img src={logo} alt="BiteBloom" className="logo" />
        <span className="logo-text">BiteBloom</span>
      </div>

      
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>

      
      <div className="navbar-right">
        {user && <Link to="/cart" className="cart-link">🛒</Link>}

        {user ? (
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              ☰
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p><strong>User:</strong> {user.username}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <Link to="/orders">Order History</Link>
                {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
