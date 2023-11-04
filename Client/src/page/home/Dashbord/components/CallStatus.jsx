import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import getPercentage from "../../../../helper/getPercentage";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import CustomToolTip from "../../../../components/ToolTip/Tooltip";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateLoader from "../../../../routes/loaders/PrivateLoader";

ChartJS.register(ArcElement, Tooltip, Legend);

const CallStatus = ({ title, data }) => {
  const [chartOptOpen, setChartOptOpen] = useState(false);
  const { dashbord } = useSelector((state) => state);
  // Vavigate
  const navigate = useNavigate();
  // All Countings
  const completed = data?.completed;
  const expaired = data?.expairedCall;
  const others = data?.others;
  const totalLeads = data?.total;

  const pendingLeads = data?.total?.filter((item) => {
    return !completed?.concat(others).includes(item);
  });

  const completePercent =
    completed?.length !== 0 && totalLeads?.length !== 0
      ? getPercentage(completed?.length, totalLeads?.length)
      : 1;
  const expairedPercent =
    expaired?.length !== 0 && totalLeads?.length !== 0
      ? getPercentage(expaired?.length, totalLeads?.length)
      : getPercentage(expaired?.length, 100);
  const othersPercents =
    others?.length !== 0 && totalLeads?.length !== 0
      ? getPercentage(others?.length, totalLeads?.length)
      : 1;
  const pendingPercents =
    pendingLeads?.length !== 0 && totalLeads?.length !== 0
      ? getPercentage(pendingLeads?.length, totalLeads?.length)
      : 1;

  const chartData = {
    labels: ["Expaired", "Complete", "Others", "Pending"],
    datasets: [
      {
        label: "Lead status ",
        data: [
          expairedPercent,
          completePercent,
          othersPercents,
          pendingPercents,
        ],
        backgroundColor: ["#e74c3c", "#2ecc71", "#9b59b6", "#3498db"],
        borderColor: ["#c0392b", "#27ae60", "#8e44ad", "#2980b9"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    return setChartOptOpen(false);
  }, []);

  return (
    <div className="col-12 col-lg-4 col-xl-4 d-flex">
      <div className="card w-100 rounded-4">
        <div className="card-body">
          {dashbord.isLoading ? <strong>Loading...</strong> : ""}
          <div className="d-flex align-items-center mb-3">
            <h6 className="mb-0">
              {title ? title : "Title"}{" "}
              <CustomToolTip message={"1% is default value. It's means 0"}>
                ?
              </CustomToolTip>{" "}
            </h6>
            <div className="fs-5 ms-auto dropdown">
              <div
                className={`dropdown-toggle dropdown-toggle-nocaret cursor-pointer ${
                  chartOptOpen ? "show" : ""
                }`}
                data-bs-toggle="dropdown"
              >
                <i
                  onClick={() => setChartOptOpen((prev) => !prev)}
                  className="bi bi-three-dots"
                ></i>
              </div>
              <ul
                style={{ transform: "translateX(-162px)" }}
                className={`dropdown-menu ${chartOptOpen ? "show" : ""}`}
              >
                <li>
                  <button
                    disabled={totalLeads?.length === 0}
                    className="dropdown-item"
                    onClick={() =>
                      navigate("/datagrid", {
                        state: {
                          leads: totalLeads.concat(expaired),
                          title: `${title} Total`,
                        },
                      })
                    }
                  >
                    Total DataGrid
                  </button>
                </li>
                <li>
                  <button
                    disabled={others?.length === 0}
                    className="dropdown-item"
                    onClick={() =>
                      navigate("/datagrid", {
                        state: {
                          leads: others,
                          title: `${title} With Others Status`,
                        },
                      })
                    }
                  >
                    Others Lead
                  </button>
                </li>
                <li>
                  <button
                    disabled={pendingLeads?.length === 0}
                    className="dropdown-item"
                    onClick={() =>
                      navigate("/datagrid", {
                        state: {
                          leads: pendingLeads,
                          title: `${title} Pending`,
                        },
                      })
                    }
                  >
                    Pending Lead
                  </button>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    disabled={expaired?.length === 0}
                    className="dropdown-item"
                    onClick={() =>
                      navigate("/datagrid", {
                        state: {
                          leads: expaired,
                          title: `${title} Expired`,
                        },
                      })
                    }
                  >
                    Expired Lead
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {(totalLeads?.length === 0 || totalLeads === undefined) &&
          (expaired?.length === 0 || expaired === undefined) ? (
            <>
              <span className="text-danger">No Data Found!</span>
              <Pie data={chartData} />
            </>
          ) : (
            <Pie data={chartData} />
          )}
        </div>
        <ul className="list-group list-group-flush mb-0 shadow-none">
          <li className="list-group-item bg-transparent">
            <i
              style={{ color: "#2ecc71" }}
              className="bi bi-circle-fill me-2 font-weight-bold"
            ></i>{" "}
            Complete <span className="float-end">{completed?.length}</span>
          </li>
          <li className="list-group-item bg-transparent border-top">
            <i
              style={{ color: "#9b59b6" }}
              className="bi bi-circle-fill me-2 font-weight-bold"
            ></i>{" "}
            Others <span className="float-end">{others?.length}</span>
          </li>
          <li className="list-group-item bg-transparent border-top">
            <i
              style={{ color: "#3498db" }}
              className="bi bi-circle-fill me-2 font-weight-bold"
            ></i>{" "}
            Pending <span className="float-end">{pendingLeads?.length}</span>
          </li>
          <li className="list-group-item bg-transparent">
            <i
              style={{ color: "#e74c3c" }}
              className="bi bi-circle-fill me-2 font-weight-bold"
            ></i>{" "}
            Expired <span className="float-end">{expaired?.length}</span>
          </li>
          <li className="list-group-item bg-transparent">
            <i
              style={{ color: "green" }}
              className="bi bi-circle-fill me-2 font-weight-bold"
            ></i>{" "}
            ToTal <span className="float-end">{totalLeads?.length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CallStatus;
