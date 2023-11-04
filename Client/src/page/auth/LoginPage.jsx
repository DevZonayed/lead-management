import React, { useEffect, useId, useState } from "react";
import Tooltip from "../../components/ToolTip/Tooltip";
import useAxios from "../../hooks/auth/useAxios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isLogin, loginReq } = useSelector((state) => state.myData);
  const navigate = useNavigate();
  const { login } = useAxios();
  const [auth, setAuth] = useState("");
  const [password, setPassword] = useState("");
  const id = useId();
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  //   Login Submit Handler
  const handleLogin = (e) => {
    e?.preventDefault();
    login({ auth, password });
  };

  // Login in press Enter
  const handleLoginWithEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate(redirect ? redirect : "/");
    }
  }, []);

  return (
    <div>
      <div
        onContextMenu={(e) => e.preventDefault()}
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "0px",
        }}
        className="bg-login"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="wrapper"
        >
          <main style={{ width: "100%" }} className="authentication-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-lg-4 mx-auto">
                  <div className="card shadow rounded-5 overflow-hidden">
                    <div className="card-body p-4 p-sm-5">
                      <h5 className="card-title">Sign In</h5>
                      <p className="card-text mb-5">
                        Hello there Welcome to soroBindu Menagement !
                      </p>
                      <form onSubmit={handleLogin} className="form-body">
                        <div className="row g-3">
                          <div className="col-12">
                            <label
                              htmlFor="inputEmailAddress"
                              className="form-label"
                            >
                              Email Address or Phone number{" "}
                              <Tooltip
                                message={
                                  "For Login with phone number please give the phone number without '0'"
                                }
                              >
                                ?
                              </Tooltip>
                            </label>
                            <div className="ms-auto position-relative">
                              <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                                <i className="bi bi-envelope-fill"></i>
                              </div>
                              <input
                                value={auth}
                                onChange={(e) => setAuth(e.target.value)}
                                type="text"
                                onKeyUp={handleLoginWithEnter}
                                className="form-control radius-30 ps-5"
                                id="inputEmailAddress"
                                placeholder="Email or Phone"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="inputChoosePassword"
                              className="form-label"
                            >
                              Enter Password
                            </label>
                            <div className="ms-auto position-relative">
                              <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                                <i className="bi bi-lock-fill"></i>
                              </div>
                              <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="true"
                                type="password"
                                onKeyUp={handleLoginWithEnter}
                                className="form-control radius-30 ps-5"
                                id="inputChoosePassword"
                                placeholder="Enter Password"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            {/* <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                                checked=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexSwitchCheckChecked"
                              >
                                Remember Me
                              </label>
                            </div> */}
                          </div>
                          <div className="col-6 text-end">
                            {" "}
                            <button disabled>Forgot Password ?</button>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button
                                type="submit"
                                className="btn btn-primary radius-30"
                              >
                                {loginReq ? "Please Wait..." : "Sign In"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id={id}
              style={{
                position: "fixed",
                bottom: "20px",
                width: "100%",
                textAlign: "center",
                textShadow: "0px 0px 10px rgba(0,0,0,0.4)",
                display: "block",
                zIndex: "9999999999999999",
                userSelect: "none",
              }}
              onContextMenu={(e) => e.preventDefault()}
              className="love"
            >
              <strong id={id} style={{ color: "white" }}>
                Crafted With{" "}
                <span id={id} style={{ color: "red" }}>
                  ❤
                </span>{" "}
                By Zonayed Ahamad...!
              </strong>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
