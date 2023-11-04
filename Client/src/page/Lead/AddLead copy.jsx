import React, { useEffect, useState } from "react";
import { useId } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/auth/useAxios";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { useRef } from "react";
import processCsvData from "../../helper/processCsvJsonData";
import PrivateLoader from "../../routes/loaders/PrivateLoader";
import isValidLead from "../../helper/importDataFilter";
import BulkImportData from "./components/BulkImportData";

const AddLead = () => {
  const id = useId();
  const { sessions, subjects, bulkEntry } = useSelector((state) => state);
  const { getAllSubjects, getAllSessions, entryLeadBulkly } = useAxios();
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
  // All Lead
  const [leadData, setLeadData] = useState({
    isLoading: false,
    data: [],
    errorData: [],
  });
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
            data: processedData,
            errorData: isValidLead(processedData, subjects),
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
    entryLeadBulkly(selectedOpt);
    // console.log(selectedOpt);
  };

  if (bulkEntry.isLoading) {
    return (
      <PrivateLoader style={{ height: "85vh" }}>
        Data processing{" "}
        <span className="text-danger bg-warning">It may take 0 to 5 min</span>{" "}
        please wait...
      </PrivateLoader>
    );
  } else {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <BulkImportData />
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              {leadData.isLoading ? (
                <div className="loading p-5">
                  <PrivateLoader />
                  <p className="text-center">Processing...</p>
                </div>
              ) : (
                <div className="card-body">
                  <h5 className="card-title">
                    {leadData.data.length} Data Found{" "}
                    {leadData?.errorData?.length !== 0 ? (
                      <strong style={{ color: "red" }}>
                        And {leadData?.errorData?.length} Invalid Data
                      </strong>
                    ) : (
                      ""
                    )}
                  </h5>
                  <hr />
                  <div
                    style={{ maxHeight: "70vh", overflowX: "auto" }}
                    className="bulkDisplay"
                  >
                    {(leadData?.errorData?.length === 0
                      ? leadData.data
                      : leadData?.errorData
                    ).map((item, index) => {
                      return (
                        <div key={"leadItem" + index} className="leadItem">
                          <span>{item.phone}</span> ---
                          <span>{item.email}</span> --{" "}
                          {leadData?.errorData?.length !== 0 ? (
                            <strong style={{ color: "red" }}>
                              Origine/reg Date/leadBy Invalid
                            </strong>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AddLead;
