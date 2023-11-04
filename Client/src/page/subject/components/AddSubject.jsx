import React, { useId, useState } from "react";
import { useSelector } from "react-redux";
import Tooltip from "../../../components/ToolTip/Tooltip";
import { upperCaseWithHyphen } from "../../../helper/utils";
import useAxios from "../../../hooks/auth/useAxios";

const AddSubject = () => {
  const id = useId();
  const { myData } = useSelector((state) => state);
  const [subTitle, setSubTitle] = useState("");
  const { registerSubject } = useAxios();
  const adminRole = ["admin"];

  // Subject Create Handler
  const handleSubjectCreate = () => {
    registerSubject(subTitle);
  };
  return (
    <div>
      {adminRole.includes(myData.data.role) && (
        <div className="card border mt-0 pt-0">
          <div className="card-body">
            <div className="form-container">
              <label htmlFor={id}>
                Subject Title
                <Tooltip message={"Subject name is like Session Topic"}>
                  ?
                </Tooltip>
              </label>
              <input
                value={subTitle}
                onChange={(e) =>
                  setSubTitle(upperCaseWithHyphen(e.target.value))
                }
                type="text"
                id={id}
                className="form-control form-control-sm"
                placeholder="Type a short title"
              />
              <button
                onClick={handleSubjectCreate}
                className="btn btn-primary btn-sm mt-2 w-100"
              >
                Add The Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubject;
