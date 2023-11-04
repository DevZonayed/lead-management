import React from "react";
import { useState } from "react";
import BulkReportTable from "./BulkReportTable";

const BulkEntryReport = () => {
  // Get All VBulk Entry
  const [searchStr, setSearchStr] = useState("");
  const [reportType, setReportType] = useState("MENUAL");
  return (
    <div>
      <div className="bulkEntry_conteiner">
        <>
          <div className="allBulkReportData">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <h5 className="mb-0">
                    {reportType !== "MANUAL" ? "Manual" : "Dynamic"} Import
                    Reports
                  </h5>
                  <form className="ms-auto position-relative">
                    <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                      <i className="bi bi-search"></i>
                    </div>
                    <input
                      onChange={(event) => setSearchStr(event.target.value)}
                      className="form-control ps-5"
                      type="text"
                      placeholder="search"
                    />
                  </form>
                </div>
                {/* Bulk Import Data */}
                <BulkReportTable
                  setReportType={setReportType}
                  search={searchStr}
                />
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default BulkEntryReport;
