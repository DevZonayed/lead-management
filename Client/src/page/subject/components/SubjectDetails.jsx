import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddSession from "./AddSession";
import SingleSessionBox from "./SingleSessionBox";
import "../style/subject.css";

const SubjectDetails = ({ subDetails }) => {
  const [addSession, setAddSession] = useState(false);
  const { sessions } = useSelector((state) => state);
  let sessionForThisSub = sessions.data.filter(
    (item) => item.subject.id === subDetails._id
  );
  return (
    <div className="subjectDetails">
      {Object.values(subDetails).length !== 0 && (
        <div className="card">
          <div
            style={{
              height: "85vh",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            className="card-body d-flex"
          >
            {/* Header */}
            <div className="header">
              <h4>
                You are in
                <span className="bg-warning"> {subDetails.title} </span>
                Subject
              </h4>
              <hr />
            </div>
            <div style={{ flexGrow: "1" }} className="sessions">
              <div className="row">
                {sessionForThisSub.length !== 0 ? (
                  sessionForThisSub.map((singleSession) => {
                    return (
                      <SingleSessionBox
                        key={singleSession._id}
                        singleSession={singleSession}
                      />
                    );
                  })
                ) : (
                  <p className="alert alert-warning">Sessions Not Found!</p>
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div className="footer">
              <hr className="mb-2" />
              {/* Add Session */}
              <div
                style={{
                  position: "fixed",
                  bottom: "15vh",
                  right: "50px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
                className="add-sessions"
              >
                {addSession && (
                  <AddSession
                    addSessionPopup={setAddSession}
                    subject={subDetails}
                  />
                )}
                <button
                  onClick={() => setAddSession((prev) => !prev)}
                  className="btn btn-primary"
                >
                  Add Session to {subDetails.title}
                </button>
              </div>
              {/* Footer content */}
              <div className="footer-content d-flex justify-content-between">
                <p>
                  Created At :{" "}
                  {new Date(subDetails.createdAt).toLocaleString("en", {
                    timeStyle: "long",
                    dateStyle: "medium",
                  })}
                </p>
                <p>Created By : {subDetails.createdBy.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectDetails;
