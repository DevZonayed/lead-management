import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import isDate from "../../../../helper/dateValidatior";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

const FollowUpAlert = ({ userName }) => {
  const { dashbord } = useSelector((state) => state);
  const [followUpData, setFollowUpData] = useState([]);
  const [, setIsoVer] = useState(false); // Only for re rander after complete
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Timer data will assign befor 30 hour
     */
    let timer = setInterval(() => {
      let followUpNow = dashbord.data.allFollowUps.allFollowUps.filter(
        (item) => {
          return (
            isDate(item.followUpTime) &&
            new Date(item?.followUpTime) < new Date(Date.now() + 108000000)
          );
        }
      );
      if (
        JSON.stringify(followUpData.map((item) => item.id)) ===
        JSON.stringify(followUpNow.map((item) => item.id))
      ) {
        return false;
      } else {
        setFollowUpData(followUpNow);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dashbord.data.allFollowUps, followUpData]);

  return (
    <div>
      {followUpData.length !== 0 && (
        <div className="card bg-warning">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-lg-3">
                <h6>Hello {userName}!</h6>
                <p className="m-0">
                  We have {followUpData.length} follow up call{" "}
                  {new Date(followUpData[0].followUpTime) > Date.now()
                    ? ""
                    : ", Let's Complete"}
                  !
                </p>
              </div>
              <div className="col-12 col-lg-9">
                <div className="row">
                  <div className="col-12 col-lg-7">
                    <div
                      style={{ fontSize: "32px", color: "red" }}
                      className="timer w-60"
                    >
                      <Countdown
                        onComplete={() => setIsoVer((prev) => !prev)}
                        overtime={true}
                        date={followUpData[0].followUpTime}
                      />
                      <span
                        style={{ fontSize: "32px", marginLeft: "10px" }}
                        className="subtitle"
                      >
                        {" "}
                        {new Date(followUpData[0].followUpTime) > Date.now()
                          ? "Time later"
                          : "Time Late Already !"}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-lg-5">
                    <div className="action w-100">
                      <button
                        onClick={() =>
                          navigate("/datagrid", {
                            state: {
                              leads: followUpData.map((item) => item.id),
                              title: `Follow up leads`,
                            },
                          })
                        }
                        className="custom-btn w-100 btn-11"
                      >
                        Follow Up Expired Data<div className="dot"></div>
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

export default FollowUpAlert;
