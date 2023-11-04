import React from "react";
import useComponentVisible from "../../../hooks/useComponentVisible";

/**
 *
 * @props {badge , element , title , children}
 * @returns
 */
const ToggleIcon = ({ badge, element, title, children }) => {
  const [ref, showDrop, setShowDrop] = useComponentVisible(false);
  return (
    <div ref={ref}>
      <li
        style={{ userSelect: "none" }}
        className="nav-item dropdown dropdown-large"
      >
        <span
          style={{ cursor: "pointer" }}
          className={`nav-link dropdown-toggle ${
            showDrop && "show"
          } dropdown-toggle-nocaret`}
          onClick={() => setShowDrop((prev) => !prev)}
        >
          <div className="messages">
            {badge && <span className="notify-badge">{badge}</span>}
            {element ? element : <i className="bi bi-bell-fill"></i>}
          </div>
        </span>
        <div
          style={{ right: 0 }}
          className={`dropdown-menu ${
            showDrop && "show"
          } dropdown-menu-end p-0`}
        >
          <div className="p-2 border-bottom m-2">
            <h5 className="h5 mb-0">{title ? title : "Title"}</h5>
          </div>
          <div
            style={{ overflowX: "auto" }}
            className="header-message-list p-2"
          >
            {children}
          </div>
        </div>
      </li>
    </div>
  );
};

export default ToggleIcon;
