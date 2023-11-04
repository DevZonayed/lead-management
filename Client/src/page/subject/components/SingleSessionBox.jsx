import React from "react";
import { useState } from "react";
import useAxios from "../../../hooks/auth/useAxios";
import { useNavigate } from "react-router-dom";

const SingleSessionBox = ({ singleSession }) => {
  const { terminateSession } = useAxios();
  const navigate = useNavigate();
  const [status] = useState(() => {
    if (
      new Date(singleSession.startAt).getTime() <= Date.now() &&
      new Date(singleSession.endAt).getTime() >= Date.now()
    ) {
      return "Running";
    } else if (new Date(singleSession.endAt).getTime() <= Date.now()) {
      return "Closed";
    } else {
      return "Pending";
    }
  });

  // Terminate Handler
  const handleSessionTarminate = (id) => {
    terminateSession(id);
  };

  // Handle Session DataGrid
  const handleSessionDataGrid = () => {
    navigate("/datagrid", {
      state: {
        leads: singleSession.leads,
        title: `${singleSession?.subject?.title} - ${singleSession?.sessionNo} - All Lead`,
      },
    });
  };
  return (
    <div className="col-lg-6 col-xxl-4">
      <div className="sessionitems">
        {Object.values(singleSession).length !== 0 && (
          <div className="card border">
            <div className="card-body">
              <h6>Session {singleSession.sessionNo}</h6>
              <hr className="m-0 mb-1" />
              <div className="row">
                <div className="col-6">
                  <strong>Total Leads</strong>
                </div>
                <div className="col-6">
                  <p className=" m-0">: {singleSession?.leads?.length}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <strong>Lead Target</strong>
                </div>
                <div className="col-6">
                  <p className=" m-0">: {singleSession.leadExpectation}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <strong>Stu Target</strong>
                </div>
                <div className="col-6">
                  <p className=" m-0">: {singleSession.studentExpectation}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <strong>Start At</strong>
                </div>
                <div className="col-6">
                  <p className=" m-0">
                    :{" "}
                    {new Date(singleSession.startAt).toLocaleString("en", {
                      dateStyle: "medium",
                    })}{" "}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <strong>End At</strong>
                </div>
                <div className="col-6">
                  <p className=" m-0">
                    :{" "}
                    {new Date(singleSession.endAt).toLocaleString("en", {
                      dateStyle: "medium",
                    })}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <strong>Status </strong>
                </div>
                <div className="col-6">
                  <p className="m-0">: {status}</p>
                </div>
              </div>
              <div className="row my-1">
                <div
                  style={{ justifyContent: "center", display: "flex" }}
                  className="col"
                >
                  <button
                    disabled={singleSession?.leads?.length !== 0}
                    className="btn btn-sm btn-danger mx-1"
                    onClick={() => handleSessionTarminate(singleSession._id)}
                  >
                    Take Down
                  </button>

                  <button
                    onClick={handleSessionDataGrid}
                    className="btn btn-sm btn-success mx-1"
                  >
                    Data Grid
                  </button>
                </div>
              </div>

              <hr className="m-0" />
              <div className="row">
                <div className="col-12">
                  <p className=" m-0">
                    {new Date(singleSession.createdAt).toLocaleString("en", {
                      timeStyle: "medium",
                      dateStyle: "medium",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSessionBox;
