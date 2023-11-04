import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExpairedAlert = ({ userName }) => {
  const { dashbord } = useSelector((state) => state);
  const navigate = useNavigate();

  return (
    <div>
      {dashbord.data?.todaysLeads?.expairedCall.length !== 0 && (
        <div className="card bg-danger text-white">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-lg-3">
                <h6>Hello {userName}!</h6>
                <p className="m-0">
                  You have {dashbord.data?.todaysLeads?.expairedCall?.length}{" "}
                  Expired Lead , Let's Complete !
                </p>
              </div>
              <div className="col-12 col-lg-9">
                <div className="row">
                  <div className="col-12 text-center col-lg-7">
                    <span style={{ fontSize: "32px" }}>Deadline Crossed!</span>
                  </div>
                  <div className="col-12 col-lg-5">
                    <div className="action w-100">
                      <button
                        onClick={() =>
                          navigate("/datagrid", {
                            state: {
                              leads: dashbord.data?.todaysLeads?.expairedCall,
                              title: `Expired Leads`,
                            },
                          })
                        }
                        className="custom-btn w-100 btn-11"
                      >
                        Deadline Crossed Data<div className="dot"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpairedAlert;
