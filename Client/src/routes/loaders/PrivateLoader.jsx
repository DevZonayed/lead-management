import React from "react";
import "./style/style.css";

const PrivateLoader = ({ children, ...rest }) => {
  return (
    <div {...rest} className="private_route_loading_wrapper">
      <div
        style={{ flexDirection: "column", alignItems: "center" }}
        className="spanConteiner d-flex"
      >
        <div className="private_loader"></div>
        <p className="text-center">{children}</p>
      </div>
    </div>
  );
};

export default PrivateLoader;
