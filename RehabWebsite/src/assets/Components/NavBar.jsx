import React from "react";
import "../Styles/NavBar.css"; // Add styles for the navbar
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>RehabWeb</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="#home" onClick={handleHome}>
            Home
          </a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#logout" className="Logout" onClick={handleLogout}>
            Log Out
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
