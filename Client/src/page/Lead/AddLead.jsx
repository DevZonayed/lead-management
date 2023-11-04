import React, { useState } from "react";
import { useSelector } from "react-redux";
import PrivateLoader from "../../routes/loaders/PrivateLoader";
import BulkImportAdmitted from "./components/BulkImportAdmitted";
import BulkImportData from "./components/BulkImportData";

const AddLead = () => {
  const { bulkEntry } = useSelector((state) => state);
  const [leadData, setLeadData] = useState({
    isLoading: false,
    data: [],
    errorData: [],
  });

  const [dataType, setDataType] = useState("general");

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
            <div style={{ overflow: "hidden" }} className="card">
              <div className="card-actions">
                <div
                  className="btn-group w-100"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    onClick={() => setDataType("general")}
                    type="button"
                    className={`btn rounded-0 ${
                      dataType === "general" ? "active" : ""
                    } btn-primary btn-sm`}
                  >
                    General Data
                  </button>
                  <button
                    onClick={() => setDataType("admitted")}
                    type="button"
                    className={`btn ${
                      dataType === "admitted" ? "active" : ""
                    } rounded-0 btn-success btn-sm`}
                  >
                    Admited Data
                  </button>
                </div>
              </div>
              {dataType === "general" ? (
                <BulkImportData leadData={leadData} setLeadData={setLeadData} />
              ) : (
                <BulkImportAdmitted
                  leadData={leadData}
                  setLeadData={setLeadData}
                />
              )}
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
