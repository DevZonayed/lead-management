import React, { useEffect, memo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaginatedItems from "../../../components/pagnations/Pagination";
import getColor from "../../../helper/genColorBasedOnValue";
import getPercentage from "../../../helper/getPercentage";
import useAxios from "../../../hooks/auth/useAxios";
import PrivateLoader from "../../../routes/loaders/PrivateLoader";
import "../style.css";

const BulkReportTable = ({ search, setReportType: setReportTypeForTitle }) => {
  const navigate = useNavigate();
  const { getAllBulkEntryReport } = useAxios();

  const pageSize = 7;
  // Paginate Info
  const [paginateInfo, setPaginateInfo] = useState({
    pageNo: 0,
  });
  const [reportType, setReportType] = useState("MANUAL");
  const [reportData, setReportData] = useState([]);
  const [allData, setAllData] = useState([]);
  // All entry
  const { bulkEntry } = useSelector((state) => state);

  // All Effects

  // Getting Data
  useEffect(() => {
    if (allData.length <= pageSize * paginateInfo.pageNo) {
      getAllBulkEntryReport({
        pageSize: pageSize,
        pageNo: paginateInfo.pageNo,
        type: reportType,
      });
    }
    setReportData(paginateItem(allData));
  }, [paginateInfo]);

  // Searching Item
  useEffect(() => {
    if (search === "") {
      setReportData(paginateItem(allData));
    } else {
      let filteredData = allData.filter((item) => {
        return (
          new RegExp(search.trim(), "i").test(item.title) ||
          new RegExp(search.trim(), "i").test(item._id) ||
          new RegExp(search.trim(), "i").test(item?.subject?.title) ||
          new RegExp(search.trim(), "i").test(
            `session ${item?.session?.sessionNo}`
          ) ||
          new RegExp(search.trim(), "i").test(item?.createBy?.name)
        );
      });
      setReportData(paginateItem(filteredData));
    }
  }, [search]);

  useEffect(() => {
    let data = bulkEntry.data.filter((item) => item?.type === reportType);
    if (reportType === "MANUAL") {
      data = bulkEntry.data.filter(
        (item) => item?.type === reportType || !item.type
      );
    }
    setAllData(data);
    setReportData(paginateItem(data));
  }, [reportType, bulkEntry]);

  useEffect(() => {
    let data = bulkEntry.data.filter((item) => item?.type === reportType);
    if (reportType === "DYNAMIC") {
      if (data.length === 0 || data.length < bulkEntry.dynamiCount) {
        getAllBulkEntryReport({
          pageSize: pageSize,
          pageNo: paginateInfo.pageNo,
          type: reportType,
        });
      }
    }
  }, [reportType]);

  // All Controller
  // Handle Paginate
  function paginateItem(data) {
    const newOffset =
      (paginateInfo.pageNo * pageSize) %
      (reportType === "MANUAL" ? bulkEntry.manualCount : bulkEntry.dynamiCount);
    const endOffset = newOffset + pageSize;
    const currentItems = data.slice(newOffset, endOffset);
    return currentItems;
  }
  // Navigate to datagrid
  function handleNavigate(data) {
    navigate("/datagrid", {
      state: data,
    });
  }

  return (
    <div>
      <>
        <div className="table-responsive mt-3">
          {reportData.length === 0 && !bulkEntry.isLoading ? (
            <p className="alert alert-danger">Data Not Found</p>
          ) : bulkEntry.isLoading ? (
            <PrivateLoader />
          ) : (
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>ID</th>
                  <th>Subject</th>
                  <th>Matched Lead</th>
                  <th>Fresh Lead</th>
                  <th>Admitted Lead</th>
                  <th>Upload Date</th>
                  <th>Overall</th>
                </tr>
              </thead>
              <tbody>
                {reportData?.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item._id}</td>
                      <td>
                        {item.subject?.title} {"__"} {item.session.sessionNo}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleNavigate({
                              leads: item.previousLead,
                              title: `${item.subject.title} - ${
                                item.session.sessionNo
                              } - Matched Lead - ( Bulk Import - ${
                                item?.title.length < 20
                                  ? item?.title
                                  : item?.title.slice(0, 20) + "... "
                              })`,
                            })
                          }
                          style={{
                            background: getColor(
                              getPercentage(
                                item.previousLead.length,
                                item.previousLead.length + item.freshLead.length
                              )
                            ),
                          }}
                          className={`btn btn-sm w-100`}
                        >
                          {getPercentage(
                            item.previousLead.length,
                            item.previousLead.length + item.freshLead.length
                          ).toFixed(2) + "%"}
                          {" -- "}
                          {item.previousLead.length}
                        </button>
                      </td>
                      <td>
                        <span
                          onClick={() =>
                            handleNavigate({
                              leads: item.freshLead,
                              title: `${item.subject.title} - ${
                                item.session.sessionNo
                              } - Fresh Lead - ( Bulk Import - ${
                                item?.title.length < 20
                                  ? item?.title
                                  : item?.title.slice(0, 20) + "... "
                              })`,
                            })
                          }
                          style={{
                            background: getColor(
                              getPercentage(
                                item.freshLead.length,
                                item.previousLead.length + item.freshLead.length
                              )
                            ),
                          }}
                          className={`btn btn-sm  w-100`}
                        >
                          {getPercentage(
                            item.freshLead.length,
                            item.previousLead.length + item.freshLead.length
                          ).toFixed(2) + "%"}
                          {" -- "}
                          {item.freshLead.length}
                        </span>
                      </td>
                      <td>
                        {
                          <span
                            onClick={() =>
                              handleNavigate({
                                leads: item.admittedLead,
                                title: `${item?.subject?.title} - ${
                                  item?.session?.sessionNo
                                } - Admitted Lead - ( Bulk Import - ${
                                  item?.title.length < 20
                                    ? item?.title
                                    : item?.title.slice(0, 20) + "... "
                                })`,
                              })
                            }
                            style={{
                              background: getColor(
                                getPercentage(
                                  item.admittedLead.length,
                                  item.previousLead.length +
                                    item.freshLead.length
                                )
                              ),
                            }}
                            className={`btn btn-sm w-100`}
                          >
                            {getPercentage(
                              item.admittedLead.length,
                              item.previousLead.length + item.freshLead.length
                            ).toFixed(2) + "%"}
                            {" -- "}
                            {item.admittedLead.length}
                          </span>
                        }
                      </td>
                      <td>
                        {new Date(item.createdAt).toLocaleDateString("en", {
                          dateStyle: "medium",
                        })}
                      </td>
                      <td>
                        <div className="progress" style={{ height: "5px" }}>
                          <div
                            className={`progress-bar bg-${
                              getPercentage(
                                item.freshLead.length,
                                item.previousLead.length + item.freshLead.length
                              ) <= 50
                                ? "danger"
                                : "success"
                            }`}
                            role="progressbar"
                            style={{
                              width: `${getPercentage(
                                item.freshLead.length,
                                item.previousLead.length + item.freshLead.length
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <PaginatedItems
          setPaginateInfo={setPaginateInfo}
          itemCount={
            reportType === "MANUAL"
              ? bulkEntry?.manualCount
              : bulkEntry?.dynamiCount
          }
          itemsPerPage={pageSize}
        />
      </>
      <div className="switch_button">
        <button
          onClick={() => {
            setReportType((prev) => (prev === "MANUAL" ? "DYNAMIC" : "MANUAL"));
            setReportTypeForTitle((prev) =>
              prev === "MANUAL" ? "DYNAMIC" : "MANUAL"
            );
          }}
          className="btn btn-primary"
        >
          {reportType === "MANUAL" ? "Dynamic" : "Menual"} Import Report
        </button>
      </div>
    </div>
  );
};

export default memo(BulkReportTable);
