import React, { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../../hooks/auth/useAxios";

const AddSession = ({ subject, addSessionPopup }) => {
  const id = useId();
  const { myData, sessions, subjects } = useSelector((state) => state);
  const { getAllSubjects, getAllSessions, registerSession } = useAxios();
  const adminRole = ["admin"];
  // Existance condition
  const [isExist, setIsExist] = useState(false);
  const [sessionStatus, setSessationStatus] = useState(false);
  const [isValidDateRange, setIsValidDateRange] = useState(false);
  const [sessionDetails, setSessionDetails] = useState({
    subject: {},
    sessionNo: "",
    startAt: "",
    endAt: "",
    leadExpectation: "",
    studentExpectation: "",
  });
  const [singleSession, setSingleSession] = useState({});

  useEffect(() => {
    if (sessions.data.length === 0) {
      getAllSessions();
    }
    if (subjects.data.length === 0) {
      getAllSubjects();
    }

    if (subject.title !== undefined || subject._id !== undefined) {
      setSessionDetails((prev) => {
        return {
          ...prev,
          subject: {
            title: subject.title,
            id: subject._id,
          },
        };
      });
    }

    return () => {
      setSessionDetails({
        subject: {},
        sessionNo: "",
        startAt: "",
        endAt: "",
        leadExpectation: "",
        studentExpectation: "",
      });
    };
  }, []);
  useEffect(() => {
    // Exist Validation

    setIsExist(
      sessions.data.filter(
        (item) =>
          item.subject.title === sessionDetails.subject?.title &&
          item.sessionNo === +sessionDetails.sessionNo
      ).length !== 0
        ? true
        : false
    );

    // Status Validation
    let subSessions = sessions.data.filter((item) => {
      return (
        item.subject.title === sessionDetails.subject?.title &&
        new Date(item.endAt).getTime() >= Date.now()
      );
    });
    if (subSessions.length !== 0) {
      subSessions.map((item) => {
        new Date(item.startAt).getTime() <= Date.now() &&
        new Date(item.endAt).getTime() >= Date.now()
          ? setSessationStatus("running")
          : new Date(singleSession.endAt).getTime() <= Date.now()
          ? setSessationStatus("closed")
          : setSessationStatus("pending");
        return false;
      });
    }

    if (sessionDetails.startAt !== "" && sessionDetails.endAt !== "") {
      setIsValidDateRange(
        new Date(sessionDetails.startAt).getTime() <
          new Date(sessionDetails.endAt).getTime()
          ? true
          : false
      );
    }

    return () => {
      setIsExist(false);
      setIsValidDateRange(false);
      setSessationStatus(false);
    };
  }, [sessionDetails]);
  // Subject Create Handler
  const handleSessionCreate = () => {
    registerSession(sessionDetails);

    setSingleSession({});
    setSessionDetails({
      subject: {},
      sessionNo: "",
      startAt: "",
      endAt: "",
      leadExpectation: "",
      studentExpectation: "",
    });
    addSessionPopup(false);
  };

  return (
    <div>
      {adminRole.includes(myData.data.role) && (
        <div className="card border">
          <div className="card-body">
            <h5>Add Sessions to {subject.title}</h5>
            <hr />
            {["running", "pending"].includes(sessionStatus) ? (
              <p className="alert alert-warning">
                Session Already {sessionStatus} in "
                {sessionDetails.subject?.title}" Subject
              </p>
            ) : isExist ? (
              <p className="alert alert-warning">Session Already Exist</p>
            ) : (
              sessionDetails.startAt !== "" &&
              sessionDetails.endAt !== "" &&
              !isValidDateRange && (
                <p className="alert alert-warning">
                  Session have to start after session End !
                </p>
              )
            )}
            <div className="form-container">
              <div className="fieldWrapper my-1">
                <label htmlFor={id}>Session number</label>
                <input
                  autoComplete="false"
                  value={sessionDetails.sessionNo}
                  onChange={(e) =>
                    setSessionDetails((prev) => {
                      return {
                        ...prev,
                        sessionNo: e.target.value,
                      };
                    })
                  }
                  type="number"
                  id={id}
                  className="form-control"
                  placeholder="Type Session Number"
                />
              </div>

              <div className="row">
                <div className="col">
                  <div className="fieldWrapper my-1">
                    <label htmlFor={id}>Session start at</label>
                    <input
                      autoComplete="false"
                      value={sessionDetails.startAt}
                      onChange={(e) =>
                        setSessionDetails((prev) => {
                          return {
                            ...prev,
                            startAt: e.target.value,
                          };
                        })
                      }
                      type="date"
                      id={id}
                      className="form-control"
                      placeholder="Type Session Number"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="fieldWrapper my-1">
                    <label htmlFor={id}>Session end at</label>
                    <input
                      autoComplete="false"
                      value={sessionDetails.endAt}
                      onChange={(e) =>
                        setSessionDetails((prev) => {
                          return {
                            ...prev,
                            endAt: e.target.value,
                          };
                        })
                      }
                      type="date"
                      id={id}
                      className="form-control"
                      placeholder="Type Session Number"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="fieldWrapper my-1">
                    <label htmlFor={id}>Lead Expectation</label>
                    <input
                      autoComplete="false"
                      value={sessionDetails.leadExpectation}
                      onChange={(e) =>
                        setSessionDetails((prev) => {
                          return {
                            ...prev,
                            leadExpectation: e.target.value,
                          };
                        })
                      }
                      type="number"
                      id={id}
                      className="form-control"
                      placeholder="Lead Expectation"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="fieldWrapper my-1">
                    <label htmlFor={id}>Student Expectation</label>
                    <input
                      autoComplete="false"
                      value={sessionDetails.studentExpectation}
                      onChange={(e) =>
                        setSessionDetails((prev) => {
                          return {
                            ...prev,
                            studentExpectation: e.target.value,
                          };
                        })
                      }
                      type="number"
                      id={id}
                      className="form-control"
                      placeholder="Student Expectation"
                    />
                  </div>
                </div>
              </div>
              {isValidDateRange &&
              !["running", "pending"].includes(sessionStatus) &&
              !isExist ? (
                <button
                  onClick={handleSessionCreate}
                  className="btn btn-primary mt-2 w-100"
                >
                  Add The Session
                </button>
              ) : (
                <button
                  onClick={handleSessionCreate}
                  className="btn btn-primary mt-2 w-100"
                >
                  Add The Session
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSession;
