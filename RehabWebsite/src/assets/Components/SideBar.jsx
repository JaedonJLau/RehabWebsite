import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SideBar.css";

function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-brand"></div>
      <ul className="sidebar-links">
        <li>
          <button className="sidebar-link" onClick={() => navigate("/data-entry")}>
            Data Entry
          </button>
        </li>
        <li>
          <button className="sidebar-link" onClick={() => navigate("/data-view")}>
            Data View
          </button>
        </li>
        <li>
          <button className="sidebar-link" onClick={() => navigate("/overview")}>
            Overview
          </button>
        </li>
        <li>
          <button className="sidebar-link" onClick={() => navigate("/prediction")}>
            Predictive Analysis
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
