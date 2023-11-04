import React from "react";
import Tooltip from "../../../components/ToolTip/Tooltip";
import "../style/grouping.css";

const GroupingInputs = () => {
  return (
    <div>
      {/* Session Informations */}
      <div className="card">
        <div className="card-header">
          <div className="h4">Running Sesions</div>
        </div>
        <div className="card-body">
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>
                  <strong>Subject</strong>
                </th>
                <th>
                  <strong>Session No</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wordpress</td>
                <td>02</td>
              </tr>
            </tbody>
          </table>
          <div style={{ alignItems: "center" }} className="row">
            <div className="col-3">
              <strong>Groupping For:</strong>
            </div>
            <div className="col-9">
              <select className="form-control">
                <option disabled value="">
                  Select One
                </option>
                <option value="Wordpress">Wordpress - 2</option>
                <option value="javascript">JavaScript - 1</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Groupping Divitions */}
      <div className="card">
        <div className="card-header">
          <div className="h4">All group conditions</div>
        </div>
        <div className="card-body">
          <div className="student-qty">
            <div className="row">
              <div className="col">
                <div className="h6">This Session has</div>
              </div>
              <div className="col">
                <div className="h6">250 Students</div>
              </div>
            </div>
          </div>
          <hr className="my-1" />
          <div className="batch-req">
            <strong>
              Batch Request{" "}
              <Tooltip message={"Numbers should be separate by comma"}>
                ?
              </Tooltip>
            </strong>
            <div className="input-phoneNumbers d-flex">
              <input
                className="form-control me-2"
                placeholder="Input Numbers with separate by comma"
                type="text"
              />
              <button className="btn btn-primary">Add</button>
            </div>
            <div className="batch-req-display">
              <div className="row mt-2">
                <div style={{ overflow: "auto" }} className="col-6">
                  <table
                    style={{ position: "relative" }}
                    className="table border batch-req-table table-stripe"
                  >
                    <div
                      style={{ position: "absolute", top: "0", right: "0" }}
                      className="close-batch-req btn btn-danger btn-sm"
                    >
                      Destroy
                    </div>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Zonayed Ahamadn</td>
                        <td>01774255512</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupingInputs;
