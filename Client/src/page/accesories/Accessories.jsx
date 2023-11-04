import React from "react";
import { useState } from "react";
import { useId } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Tooltip from "../../components/ToolTip/Tooltip";
import useAxios from "../../hooks/auth/useAxios";

const Accessories = () => {
  const id = useId();
  const myData = useSelector((state) => state.myData);
  const { addAccessoriesToUser, removeFromUserAccessories } = useAxios();
  const [acce, setAcce] = useState({
    title: "",
    url: "",
  });

  const adminRole = ["admin"];
  const handleAccesoriesCreate = () => {
    if (Object.values(acce).includes("")) {
      toast.warn("Both field are required!");
      return;
    }
    addAccessoriesToUser({ ...acce });
    setAcce({
      title: "",
      url: "",
    });
  };
  const handleAccessoriesDelete = (id) => {
    removeFromUserAccessories(id);
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5>All Accesories</h5>
              <hr />
              {myData.data?.accessories?.map((item, index) => {
                return (
                  <div key={"acces" + index} className="acces_wrapper">
                    <div className="row">
                      <div className="col-11">
                        <strong className="title ps-2">{item.title}</strong>{" "}
                        <br />
                        <small className="ps-2">{item.url}</small>
                      </div>
                      <div className="col-1">
                        <button
                          onClick={() => handleAccessoriesDelete(item._id)}
                          className="btn btn-danger btn-sm"
                        >
                          X
                        </button>
                      </div>
                    </div>

                    <hr className="m-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5>Add Some Imortant Links</h5>
              <hr />
              {(adminRole.includes(myData.data.role)
                ? myData.data?.accessories?.length >= 20
                : myData.data?.accessories?.length >= 10) && (
                <p className="alert alert-danger">
                  You have reached to maximum Accessories
                </p>
              )}
              <div className="form-container">
                <label htmlFor={id}>
                  Input a title{" "}
                  <Tooltip message={"Try to give in one word"}> ?</Tooltip>
                </label>
                <input
                  disabled={
                    adminRole.includes(myData.data.role)
                      ? myData.data?.accessories?.length >= 20
                      : myData.data?.accessories?.length >= 10
                  }
                  value={acce.title}
                  onChange={(e) =>
                    setAcce((prev) => {
                      return { ...prev, title: e.target.value };
                    })
                  }
                  type="text"
                  id={id}
                  className="form-control"
                  placeholder="Type a short title"
                />
                <label className="mt-2" htmlFor={id}>
                  Input a URL
                </label>
                <input
                  disabled={
                    adminRole.includes(myData.data.role)
                      ? myData.data?.accessories?.length >= 20
                      : myData.data?.accessories?.length >= 10
                  }
                  value={acce.url}
                  onChange={(e) =>
                    setAcce((prev) => {
                      return { ...prev, url: e.target.value };
                    })
                  }
                  type="text"
                  id={id}
                  className="form-control"
                  placeholder="Type a URL"
                />
                <button
                  disabled={
                    adminRole.includes(myData.data.role)
                      ? myData.data?.accessories?.length >= 20
                      : myData.data?.accessories?.length >= 10
                  }
                  onClick={handleAccesoriesCreate}
                  className="btn btn-primary mt-2 w-100"
                >
                  Add to accessories
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
