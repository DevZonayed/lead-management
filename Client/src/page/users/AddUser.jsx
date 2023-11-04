import React, { useState } from "react";
import Tooltip from "../../components/ToolTip/Tooltip";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import useAxios from "../../hooks/auth/useAxios";

const AddUser = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });
  const [adminConfirmCheck, setAdminConfirmCheck] = useState(false);

  const { registerUser } = useAxios();

  //   Handle user info
  const handleUserInfo = (key, value) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  //   Handle Registration
  const handleReg = () => {
    // Admin role validation
    if (userInfo.role === "admin" && !adminConfirmCheck) {
      toast.error("Please check to the checkbox!");
      return;
    }
    // Empty field validation
    if (Object.values(userInfo).includes("")) {
      toast.error("Please fillup all the fields !");
      return;
    }

    // Request send
    registerUser(userInfo);
  };

  return (
    <div>
      <div className="row">
        <div className="col-xl-9 mx-auto">
          <h6 className="mb-0 text-uppercase">Add User</h6>
          <hr />
          <div className="card">
            <div className="card-body">
              <div className="border p-4 rounded">
                <div className="card-title d-flex align-items-center">
                  <h5 className="mb-0">Fillup the form</h5>
                </div>
                <hr />
                <div className="row mb-3">
                  <label
                    htmlFor="firstnamefiels"
                    className="col-sm-3 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      onChange={(e) =>
                        handleUserInfo("firstName", e.target.value)
                      }
                      value={userInfo.firstName}
                      type="text"
                      className="form-control"
                      id="firstnamefiels"
                      placeholder="Enter First Name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="lastNameField"
                    className="col-sm-3 col-form-label"
                  >
                    Last Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      onChange={(e) =>
                        handleUserInfo("lastName", e.target.value)
                      }
                      value={userInfo.lastName}
                      type="text"
                      className="form-control"
                      id="lastNameField"
                      placeholder="Enter First Name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPhoneNo2"
                    className="col-sm-3 col-form-label"
                  >
                    Phone No
                  </label>
                  <div className="col-sm-9">
                    <input
                      onChange={(e) => handleUserInfo("phone", e.target.value)}
                      value={userInfo.phone}
                      type="text"
                      className="form-control"
                      id="inputPhoneNo2"
                      placeholder="Phone No"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmailAddress2"
                    className="col-sm-3 col-form-label"
                  >
                    Email Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      onChange={(e) => handleUserInfo("email", e.target.value)}
                      value={userInfo.email}
                      type="email"
                      className="form-control"
                      id="inputEmailAddress2"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputChoosePassword2"
                    className="col-sm-3 col-form-label"
                  >
                    Type a password
                  </label>
                  <div className="col-sm-9 d-flex">
                    <input
                      onChange={(e) =>
                        handleUserInfo("password", e.target.value)
                      }
                      value={userInfo.password}
                      type="email"
                      className="form-control me-2"
                      id="inputChoosePassword2"
                      placeholder="Type a password"
                    />
                    <button
                      onClick={() => handleUserInfo("password", uuid())}
                      className="btn btn-success"
                      disabled={userInfo.password !== ""}
                    >
                      Generate
                    </button>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="roleinput"
                    className="col-sm-3 col-form-label"
                  >
                    Role <Tooltip message={"Please be careful!"}>?</Tooltip>
                  </label>
                  <div className="col-sm-9">
                    <select
                      onChange={(e) => handleUserInfo("role", e.target.value)}
                      defaultValue={"default"}
                      className="form-control"
                      id="roleinput"
                    >
                      <option value="default" disabled>
                        Select One
                      </option>
                      <option value="agent">Agent</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                {userInfo.role === "admin" && (
                  <div className="row mb-3">
                    <div className="col-sm-9">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck4"
                          checked={adminConfirmCheck}
                          onChange={() => setAdminConfirmCheck((prev) => !prev)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridCheck4"
                          style={{
                            userSelect: "none",
                          }}
                        >
                          You have select role admin ! Are you sure about that?
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                <div className="row">
                  <label className="col-sm-3 col-form-label"></label>
                  <div className="col-sm-9">
                    <button
                      onClick={handleReg}
                      className="btn btn-primary px-5"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
