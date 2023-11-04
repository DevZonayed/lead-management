import React from "react";
import { Link } from "react-router-dom";

/**
 *
 * @props {link , img , icon , title , time , description , type} param0
 * @returns
 */
const ToggleIconBlocks = ({
  link,
  img,
  icon,
  title,
  time,
  description,
  type,
  ...restProps
}) => {
  return (
    <div {...restProps}>
      {link ? (
        <Link className="dropdown-item">
          <div className="d-flex align-items-center">
            {img ? (
              <img
                src={img}
                alt=""
                className="rounded-circle"
                width="50"
                height="50"
              />
            ) : (
              icon && icon
            )}
            <div className="ms-3 flex-grow-1">
              <h6 className="mb-0 dropdown-msg-user">
                {title ? title : "Unknown"}
                <span className="msg-time float-end text-secondary">
                  {time && time}
                </span>
              </h6>
              <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">
                {description ? description : "It's Important"}
              </small>
            </div>
          </div>
        </Link>
      ) : (
        <span className="dropdown-item">
          <div className="d-flex align-items-center">
            {img ? (
              <img
                src={img}
                alt=""
                className="rounded-circle"
                width="50"
                height="50"
              />
            ) : (
              <div
                className={`notification-box bg-light-${
                  type ? type : "primary"
                } text-${type ? type : "primary"}`}
              >
                {icon ? icon : <i className="bi bi-bell-fill"></i>}
              </div>
            )}
            <div className="ms-3 flex-grow-1">
              <h6 className="mb-0 dropdown-msg-user">
                {title ? title : "Unknown"}
                <span className="msg-time float-end text-secondary">
                  {time ? time : "5 m"}
                </span>
              </h6>
              <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">
                {description ? description : "It's Important"}
              </small>
            </div>
          </div>
        </span>
      )}
    </div>
  );
};

export default ToggleIconBlocks;
