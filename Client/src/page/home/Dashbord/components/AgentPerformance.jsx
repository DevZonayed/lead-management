import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADMINROLE } from "../../../../helper/constructors";
import getPercentage from "../../../../helper/getPercentage";
import { stringifyNumber, upperCaseWithHyphen } from "../../../../helper/utils";
import useAxios from "../../../../hooks/auth/useAxios";
import PrivateLoader from "../../../../routes/loaders/PrivateLoader";
import "../style/dashbord.css";

const AgentPerformance = () => {
  const { dashbord } = useSelector((state) => state);
  const { getAgentReports } = useAxios();

  // All Handlers
  const handleAgentReportGenerate = () => {
    getAgentReports();
  };

  return (
    <>
      <div className="col-12 dashbordAgentAdmitionReport">
        <div className="card">
          <div
            style={{ justifyContent: "space-between" }}
            className="card-header d-flex"
          >
            <div className="h4">Full Session - Calling Success report</div>
            <button
              onClick={handleAgentReportGenerate}
              disabled={dashbord.isLoading}
              className="btn btn-primary"
            >
              {dashbord.isLoading ? "Please wait..." : "Generate Report"}
            </button>
          </div>
          <div className="card-body">
            {/* Place holder */}
            {dashbord.data?.agentsReport?.length === 0 &&
            dashbord.reqCount <= 1 ? (
              <TablePlaceHolder />
            ) : (
              ""
            )}
            {dashbord.isLoading && dashbord.reqCount > 1 ? (
              <PrivateLoader />
            ) : (
              ""
            )}
            {/* Main Contents */}
            {dashbord.data?.agentsReport?.length !== 0 &&
            !dashbord.isLoading ? (
              <ReportTable data={dashbord.data?.agentsReport} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function TablePlaceHolder() {
  return (
    <div
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="table-placeholder d-flex"
    >
      <div className="h6 text-orange">Generate First!</div>
    </div>
  );
}

function ReportTable({ data: reports }) {
  const { myData, dashbord } = useSelector((state) => state);

  const navigate = useNavigate();
  // Navigate to datagrid
  function handleNavigate(data) {
    navigate("/datagrid", {
      state: data,
    });
  }

  let data = [...reports]?.sort(
    (a, b) => b?.admitted?.length - a?.admitted?.length
  );
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Prediction</th>
          <th>Admitted</th>
          <th>Prediction Success</th>
          <th>Admition contribution</th>
          <th>Total Call</th>
          <th>Current Assigned</th>
          <th>Rank</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => {
          let predictionSuccess = getPercentage(
            item?.admitted?.length,
            item?.prediction?.length
          ).toFixed(2);

          let admitionContribution = getPercentage(
            item?.admitted?.length,
            dashbord.data?.orderReport?.getAllOrderInfo?.complete
          ).toFixed(2);

          return (
            <tr key={"reportTable" + index}>
              <td>{index}</td>
              <td>@{item?.name || "undefined"}</td>
              <td>
                <button
                  className={`btn btn-sm bg-gradient-purple ${
                    item?.prediction?.length ? "btn-primary" : "btn-secondary"
                  } w-100`}
                  disabled={
                    (!item?.total?.length || item.id !== myData.data._id) &&
                    !ADMINROLE.includes(myData?.data?.role)
                  }
                  onClick={() =>
                    item?.prediction?.length &&
                    handleNavigate({
                      leads: item?.prediction,
                      title: `All prediction(More than 80% probability) lead by ${item.name}`,
                    })
                  }
                >
                  {item?.prediction?.length || "undefined"}
                </button>
              </td>
              <td>
                <button
                  className={`btn btn-sm bg-gradient-success text-black ${
                    item?.admitted?.length ? "btn-success" : "btn-secondary"
                  } w-100`}
                  disabled={
                    (!item?.total?.length || item.id !== myData.data._id) &&
                    !ADMINROLE.includes(myData?.data?.role)
                  }
                  onClick={() =>
                    item?.admitted?.length &&
                    handleNavigate({
                      leads: item?.admitted,
                      title: `All Admitted lead by ${item.name}`,
                    })
                  }
                >
                  {item?.admitted?.length || "undefined"}
                </button>
              </td>
              <td>
                <div className={`btn bg-secondary text-white w-100`}>
                  {predictionSuccess}
                  {predictionSuccess !== "NaN" &&
                  predictionSuccess !== "Infinity"
                    ? "%"
                    : ""}
                </div>
              </td>
              <td>
                <div className={`btn bg-secondary text-white w-100`}>
                  {admitionContribution}
                  {admitionContribution !== "NaN" &&
                  admitionContribution !== "Infinity"
                    ? "%"
                    : ""}
                </div>
              </td>
              <td>
                <button
                  className={`btn btn-sm bg-gradient-danger text-white ${
                    item?.total?.length ? "bg-orange" : "btn-secondary"
                  } w-100`}
                  disabled={
                    (!item?.total?.length || item.id !== myData.data._id) &&
                    !ADMINROLE.includes(myData?.data?.role)
                  }
                  onClick={() =>
                    item?.total?.length &&
                    handleNavigate({
                      leads: item?.total,
                      title: `All lead called by ${item.name}`,
                    })
                  }
                >
                  {item?.total?.length || "undefined"}
                </button>
              </td>
              <td>
                <button
                  className={`btn btn-sm bg-gradient-info text-white ${
                    item?.totalAssigned?.length ? "bg-orange" : "btn-secondary"
                  } w-100`}
                  disabled={
                    (!item?.totalAssigned?.length ||
                      item.id !== myData.data._id) &&
                    !ADMINROLE.includes(myData?.data?.role)
                  }
                  onClick={() =>
                    item?.totalAssigned?.length &&
                    handleNavigate({
                      leads: item?.totalAssigned,
                      title: `All Current Assigned Lead to ${item.name}`,
                    })
                  }
                >
                  {item?.totalAssigned?.length || "undefined"}
                </button>
              </td>
              <td>{upperCaseWithHyphen(stringifyNumber(index + 1))}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AgentPerformance;
