import React, { useEffect, useId, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { margeBatch } from "../../../helper/importDataFilter";
import processCsvData from "../../../helper/processCsvJsonData";
import useAxios from "../../../hooks/auth/useAxios";
import Papa from "papaparse";

const BulkImportAdmitted = ({ setLeadData, leadData }) => {
  const id = useId();
  const { sessions, subjects } = useSelector((state) => state);
  const { getAllSubjects, getAllSessions, entryAdmittedLeadBulkly } =
    useAxios();
  // Final Inputs
  const [selectedOpt, setSelectedOpt] = useState({
    title: "",
    subject: {
      title: "",
      _id: "",
    },
    session: {
      sessionNo: "",
      _id: "",
    },
    batchNo: "",
    lead: [],
  });
  // subject options
  const [subjectOpt, setSubjectOpt] = useState([]);
  // Session options
  const [sessionOpt, setSessionOpt] = useState([]);
  // Upload type options
  const [dataType, setDataType] = useState("");
  // Upload Input
  const uploadRef = useRef();

  // Get All Subject and sessions
  useEffect(() => {
    if (subjects.data.length === 0) {
      getAllSubjects();
    }
    if (sessions.data.length === 0) {
      getAllSessions();
    }
  }, []);
  // Adding Options
  useEffect(() => {
    if (subjects.data.length !== 0) {
      setSubjectOpt(subjects.data);
    }

    if (selectedOpt.subject._id !== "") {
      const filteredSubject = subjects.data.filter(
        (item) => item._id === selectedOpt.subject._id
      )[0];

      const filteredSession = sessions?.data.filter((item) =>
        filteredSubject.sessions.includes(item._id)
      );
      setSessionOpt(filteredSession);
    }
  }, [subjects, sessions, selectedOpt]);
  // Add lead to options
  useEffect(() => {
    setSelectedOpt((prev) => {
      return {
        ...prev,
        lead: leadData.data,
      };
    });
  }, [leadData]);
  // Csv to object
  function csvToJson(csv) {
    setLeadData((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });
    Papa.parse(csv, {
      delimiter: ",",
      download: true,
      complete: (result) => {
        let processedData = processCsvData(result.data);
        setLeadData((prev) => {
          return {
            ...prev,
            isLoading: false,
            data: margeBatch(processedData),
            errorData: [],
          };
        });
      },
      error: (error) => {
        if (error) {
          toast.error(`Something Went Wrong !
             hint: Check the link or file`);
          setLeadData((prev) => {
            return {
              ...prev,
              isLoading: false,
            };
          });
        }
      },
    });
  }

  // csv from cdn handler
  const handleCDNcsvLoading = (e) => {
    const regex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    // Url validation
    if (!regex.test(e.target.value)) {
      if (e.target.value !== "") {
        toast.dismiss();
        toast.error("Invalid Url !");
      }
    }
    csvToJson(e.target.value);
  };

  // Handle Data Send
  const handleBulkAdd = () => {
    entryAdmittedLeadBulkly(selectedOpt);
    // console.log(selectedOpt);
  };

  return (
    <div className="card-body">
      <div className="bulkTitle">
        <label htmlFor={id}>Add a bulk report title</label>
        <input
          id={id}
          className="form-control form-control-sm"
          type="text"
          autoComplete="off"
          placeholder="Add a data sourch title"
          value={selectedOpt.title}
          onChange={(e) => {
            setSelectedOpt((prev) => {
              return {
                ...prev,
                title: e.target.value,
              };
            });
          }}
        />
      </div>
      <div className="subject-selections my-2">
        <label htmlFor={id}>Select Subject</label>
        <select
          className="form-control form-control-sm"
          id={id}
          defaultValue={""}
          onChange={(e) => {
            setSelectedOpt((prev) => {
              let subject = subjects.data.filter(
                (item) => item._id === e.target.value
              )[0];

              return {
                ...prev,
                subject: {
                  title: subject.title,
                  _id: subject._id,
                },
              };
            });
          }}
        >
          <option disabled value={""}>
            Select a subject
          </option>
          {subjectOpt
            .filter((item) => item.sessions.length !== 0)
            .map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
        </select>
      </div>
      <div className="session-selections my-2">
        <label htmlFor={id}>Select Sessions</label>
        <select
          className="form-control form-control-sm"
          value={selectedOpt.session._id}
          id={id}
          onChange={(e) => {
            setSelectedOpt((prev) => {
              const session = sessionOpt.filter(
                (item) => item._id === e.target.value
              )[0];
              return {
                ...prev,
                session: {
                  sessionNo: session?.sessionNo,
                  _id: session?._id,
                },
              };
            });
          }}
        >
          <option disabled value={""}>
            Select a Sessions
          </option>
          {sessionOpt.map((item) => (
            <option key={item._id} value={item._id}>
              Session {item.sessionNo}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        <div className="col">
          <div className="batch_number my-2">
            <label htmlFor={id}>Input Batch number</label>
            <input
              onChange={(event) => {
                setSelectedOpt((prev) => {
                  return {
                    ...prev,
                    batchNo: event.target.value,
                  };
                });
              }}
              disabled="true"
              value={selectedOpt.batchNo}
              type="number"
              id={id}
              placeholder={"Input Your Batch Number"}
              className="form-control form-control-sm"
            />
          </div>
        </div>
        <div className="col">
          <div className="data-upload-type my-2">
            <label htmlFor={id}>Select Upload Type</label>
            <select
              defaultValue={""}
              className="form-control form-control-sm"
              onChange={(e) => {
                setDataType(e.target.value);
              }}
              id={id}
            >
              <option disabled value="">
                Select data type
              </option>
              <option value="cdn">Add google sheet cdn</option>
              <option value="upload">Upload csv</option>
            </select>
          </div>
        </div>
      </div>
      <div className="uploadData">
        {dataType === "cdn" ? (
          <input
            type="url"
            autoComplete="false"
            placeholder="Add cdn"
            className="form-control form-control-sm"
            onChange={handleCDNcsvLoading}
          />
        ) : dataType === "upload" ? (
          <input
            ref={uploadRef}
            type="file"
            onChange={(e) => csvToJson(URL.createObjectURL(e.target.files[0]))}
            className="form-control form-control-sm"
          />
        ) : (
          ""
        )}
      </div>
      <div className="submitToServer my-2">
        <button
          disabled={
            selectedOpt.lead.length === 0 ||
            Object.values(selectedOpt.session).includes("") ||
            Object.values(selectedOpt.subject).includes("") ||
            selectedOpt.title === "" ||
            leadData?.errorData?.length !== 0
          }
          className="btn btn-primary btn-sm w-100"
          onClick={handleBulkAdd}
        >
          Import Admitted Data
        </button>
      </div>
    </div>
  );
};

export default BulkImportAdmitted;
