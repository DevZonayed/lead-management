import React, { useState, memo } from "react";
import { NavLink } from "react-router-dom";
// import useLocalState from "../../../hooks/useLocalState";
import "./style/multiMenuStyle.css";

const MultiMenu = ({ menuTitle, menuLink, menuIcon, subMenu, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <li onClick={() => setMenuOpen(!menuOpen)}>
        {menuLink && !subMenu ? (
          <NavLink
            className={
              subMenu &&
              `has-arrow multiMenuItem ${menuOpen ? "arrowDown" : ""}`
            }
            to={`${menuLink}`}
          >
            <div className="parent-icon">
              {menuIcon ? menuIcon : ""}
              {/* <i className="bi bi-house-fill"></i> */}
            </div>
            <div className="menu-title">
              {menuTitle ? menuTitle : "Menu Title"}
            </div>
          </NavLink>
        ) : (
          <span
            style={{ cursor: "pointer" }}
            className={
              subMenu &&
              `has-arrow multiMenuItem ${menuOpen ? "arrowDown" : ""}`
            }
          >
            <div className="parent-icon">
              {menuIcon ? menuIcon : ""}
              {/* <i className="bi bi-house-fill"></i> */}
            </div>
            <div className="menu-title">
              {menuTitle ? menuTitle : "Menu Title"}
            </div>
          </span>
        )}
        {subMenu && (
          <ul className={`mm-collapse ${menuOpen ? "mm-open" : ""}`}>
            {children}
          </ul>
        )}
      </li>
    </div>
  );
};

export default memo(MultiMenu);
