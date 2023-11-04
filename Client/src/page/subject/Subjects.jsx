import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/auth/useAxios";
import PrivateLoader from "../../routes/loaders/PrivateLoader";
import AddSubject from "./components/AddSubject";
import SubjectDetails from "./components/SubjectDetails";

const Subjects = () => {
  const { subjects, sessions } = useSelector((state) => state);
  const { getAllSubjects, terminateSubject, getAllSessions } = useAxios();

  const [subDetails, setSubDetails] = useState({});

  useEffect(() => {
    if (subjects.data.length === 0) {
      getAllSubjects();
    }
    if (sessions.data.length === 0) {
      getAllSessions();
    }

    return () => {
      setSubDetails({});
    };
  }, []);

  // Terminate Handler
  const handleSubjectTarminate = (id) => {
    terminateSubject(id);
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5>Subjects </h5>
              <hr />
              <AddSubject />
              {subjects.isLoading ? (
                <PrivateLoader />
              ) : subjects?.data?.length === 0 ? (
                <p className="alert alert-warning">No Data found</p>
              ) : (
                subjects?.data?.map((item, index) => {
                  return (
                    <div key={"subject" + index} className="acces_wrapper">
                      <div className="row">
                        <div
                          style={{ cursor: "pointer", userSelect: "none" }}
                          onClick={() => setSubDetails(item)}
                          className="col-10"
                        >
                          <strong className="title ps-2">{item.title}</strong>{" "}
                          <br />
                          <small className="ps-2">
                            Created At :{" "}
                            {new Date(item?.createdAt).toLocaleString("en", {
                              timeStyle: "short",
                              dateStyle: "medium",
                            })}
                          </small>
                        </div>
                        <div className="col-2">
                          {item.sessions.length === 0 ? (
                            <button
                              onClick={() => handleSubjectTarminate(item._id)}
                              className="btn btn-danger btn-sm"
                            >
                              <i className="bi m-0 bi-trash-fill"></i>
                            </button>
                          ) : (
                            <button
                              disabled
                              className="btn text-center btn-danger btn-sm"
                            >
                              <i className="bi m-0 bi-trash-fill"></i>
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
        <div className="col-lg-8">
          <SubjectDetails subDetails={subDetails} />
        </div>
      </div>
    </div>
  );
};

export default Subjects;
