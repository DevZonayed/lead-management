import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/auth/useAxios";
import { GrUserAdmin } from "react-icons/gr";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./style/user.css";
import { useState } from "react";
import { useLayoutEffect } from "react";

const AllUsers = () => {
  const adminRole = ["admin"];
  const { alluser, myData } = useSelector((state) => state);
  const { getAllUser } = useAxios();
  const [userToShow, setUserToShow] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    setUserToShow(alluser.data);
  }, [alluser.data]);

  const handleSearch = (event) => {
    if (event.target.value !== "") {
      let filteredUser = [...alluser.data].filter((singleUser) => {
        return (
          new RegExp(event.target.value, "i").test(singleUser.firstName) ||
          new RegExp(event.target.value, "i").test(singleUser.lastName) ||
          new RegExp(event.target.value, "i").test(singleUser.email) ||
          new RegExp(event.target.value, "i").test(singleUser.phone)
        );
      });
      setUserToShow(filteredUser);
    } else {
      setUserToShow(alluser.data);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="mb-0">User Details</h5>
            <form className="ms-auto position-relative">
              <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                <i className="bi bi-search"></i>
              </div>
              <input
                onChange={handleSearch}
                className="form-control ps-5"
                type="text"
                placeholder="search"
              />
            </form>
          </div>
          <div className="table-responsive userTable mt-3">
            <table className="table align-middle">
              <thead className="table-secondary">
                <tr>
                  <th>#</th>
                  <th>Avater</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  {adminRole.includes(myData.data.role) && <th>Role</th>}
                  <th>Extra Mail</th>
                  <th>Extra Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userToShow?.map((item, index) => {
                  return (
                    <tr key={"userRender" + index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-3 cursor-pointer">
                          {item.image !== "" && item.image !== undefined ? (
                            <img
                              src={item.image}
                              className="rounded-circle"
                              width="44"
                              height="44"
                              alt=""
                            />
                          ) : adminRole.includes(item.role) ? (
                            <span style={{ fontSize: "44px" }}>
                              <GrUserAdmin />
                            </span>
                          ) : (
                            <span style={{ fontSize: "44px" }}>
                              <BiUserCircle />
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="">
                          <p className="mb-0">{`${item?.firstName} ${item?.lastName}`}</p>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      {adminRole.includes(myData.data.role) && (
                        <td>
                          <span
                            className={`bg-${
                              item.role === "admin"
                                ? "success"
                                : "primary text-light"
                            } p-1 rounded`}
                          >
                            {item.role}
                          </span>
                        </td>
                      )}
                      <td>
                        {item.extraEmail.length !== 0 ? (
                          item.extraEmail.map((item, index) => {
                            <span key={"extraMail" + index}>
                              <span>{item},</span>
                            </span>;
                          })
                        ) : (
                          <span>Null</span>
                        )}
                      </td>
                      <td>
                        {item.extraPhone.length !== 0 ? (
                          item.extraPhone.map((item, index) => {
                            <span key={"extraMail" + index}>
                              <span>{item},</span>
                            </span>;
                          })
                        ) : (
                          <span>Null</span>
                        )}
                      </td>
                      <td>
                        {myData.data._id === item._id ||
                        adminRole.includes(myData.data.role) ? (
                          <div className="table-actions d-flex align-items-center gap-3 fs-6">
                            <Link
                              style={{ cursor: "pointer" }}
                              className="text-primary"
                              title="Views"
                              to={`/?userId=${item._id}&name=${item.firstName}&role=${item.role}`}
                              state={{
                                id: item._id,
                                name: item.firstName,
                                role: item.role,
                              }}
                              target="_blank"
                            >
                              <i className="bi bi-eye-fill"></i>
                            </Link>
                            <span
                              style={{ cursor: "pointer" }}
                              className="text-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </span>
                            {adminRole.includes(myData.data.role) && (
                              <span
                                style={{ cursor: "pointer" }}
                                title="Deactive"
                                className="text-danger"
                              >
                                <i className="bi bi-trash-fill"></i>
                              </span>
                            )}
                          </div>
                        ) : (
                          <span>Action Unavailable</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
