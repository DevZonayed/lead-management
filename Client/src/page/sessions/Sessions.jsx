import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useId } from "react";
import { useSelector } from "react-redux";
// import Tooltip from "../../components/ToolTip/Tooltip";
import useAxios from "../../hooks/auth/useAxios";
import PrivateLoader from "../../routes/loaders/PrivateLoader";

const Subjects = () => {
  const id = useId();
  const { myData, sessions, subjects } = useSelector((state) => state);
  const { getAllSubjects, getAllSessions, registerSession, terminateSession } =
    useAxios();
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
      return item.subject.title === sessionDetails.subject?.title;
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
  };

  // Terminate Handler
  const handleSessionTarminate = (id) => {
    terminateSession(id);
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5>All Sessions</h5>
              <hr />
              {sessions.isLoading ? (
                <PrivateLoader />
              ) : sessions?.data?.length === 0 ? (
                <p className="alert alert-warning">No Data found</p>
              ) : (
                sessions?.data?.map((item, index) => {
                  return (
                    <div key={"subject" + index} className="acces_wrapper">
                      <div className="row">
                        <div
                          style={{ cursor: "pointer", userSelect: "none" }}
                          onClick={() => setSingleSession(item)}
                          className="col-9"
                        >
                          <strong className="title ps-2">
                            {item.subject?.title} -- Session {item.sessionNo}
                          </strong>{" "}
                          <br />
                          <small className="ps-2">
                            Created At :{" "}
                            {new Date(item?.createdAt).toLocaleString("en", {
                              timeStyle: "long",
                              dateStyle: "medium",
                            })}
                          </small>
                        </div>
                        <div className="col-3">
                          {item?.leads?.length === 0 ? (
                            <button
                              onClick={() => handleSessionTarminate(item._id)}
                              className="btn btn-danger btn-sm"
                            >
                              Take Down
                            </button>
                          ) : (
                            <button disabled className="btn btn-danger btn-sm">
                              Take Down
                            </button>
                          )}
                        </div>
                      </div>

                      <hr className="m-1" />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          {adminRole.includes(myData.data.role) && (
            <div className="card">
              <div className="card-body">
                <h5>Add Sessions</h5>
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
                  <div className="fieldWrapper mb-1">
                    <label htmlFor={id}>Select Subject</label>
                    <select
                      id={id}
                      className="form-control"
                      onChange={(e) => {
                        let subject = subjects.data.filter(
                          (item) => item._id === e.target.value
                        )[0];
                        setSessionDetails((prev) => {
                          return {
                            ...prev,
                            subject: {
                              title: subject.title,
                              id: subject._id,
                            },
                          };
                        });
                      }}
                      value={sessionDetails.subject?.id || ""}
                      placeholder="Type Session Number"
                    >
                      <option disabled value="">
                        Select Subject
                      </option>
                      {subjects.data?.length !== 0 &&
                        subjects.data?.map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.title}
                            </option>
                          );
                        })}
                    </select>
                  </div>
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
                    <button disabled className="btn btn-primary mt-2 w-100">
                      Add The Session
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {Object.values(singleSession).length !== 0 && (
            <div className="card">
              <div className="card-body">
                <h4>Session Details</h4>
                <hr />
                <div className="row">
                  <div className="col-3">
                    <h6>Subject :</h6>
                  </div>
                  <div className="col-9">
                    <h6>{singleSession.subject?.title}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <h6>Sesson No :</h6>
                  </div>
                  <div className="col-9">
                    <h6>{singleSession?.sessionNo}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <h6>Status :</h6>
                  </div>
                  <div className="col-9">
                    <h6>
                      {new Date(singleSession.startAt).getTime() <=
                        Date.now() &&
                      new Date(singleSession.endAt).getTime() >= Date.now()
                        ? "Running"
                        : new Date(singleSession.endAt).getTime() <= Date.now()
                        ? "Closed"
                        : "Pending"}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <h6>Created At:</h6>
                  </div>
                  <div className="col-9">
                    <h6>
                      {new Date(singleSession.createdAt).toLocaleString("en", {
                        timeStyle: "long",
                        dateStyle: "medium",
                      })}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <h6>Time range:</h6>
                  </div>
                  <div className="col-9">
                    <h6>
                      {new Date(singleSession.startAt).toLocaleString("en", {
                        dateStyle: "medium",
                      })}{" "}
                      <span className="text-primary bg-warning">- to -</span>{" "}
                      {new Date(singleSession.endAt).toLocaleString("en", {
                        dateStyle: "medium",
                      })}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <h6>Total Leads:</h6>
                  </div>
                  <div className="col-9">
                    <h6>{singleSession.leads.length}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <h6>Lead Target:</h6>
                  </div>
                  <div className="col-9">
                    <h6>{singleSession.leadExpectation}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <h6>Stu Target:</h6>
                  </div>
                  <div className="col-9">
                    <h6>{singleSession.studentExpectation}</h6>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
