import React, { useDeferredValue, useEffect, useId, useState } from "react";
import { toast } from "react-toastify";
import Papa from "papaparse";
import useDrawer from "../../components/Drawer/hook/useDrawer";
import useAxios from "../../hooks/auth/useAxios";
import processCsvData from "../../helper/processCsvJsonData";
import ReportDetails from "./ReportDetails";
import SendMailDrawer from "../../components/DataGrid/subComponents/DrawerComponents/SendMailDrawer";
// import processCsvData from "../../../helper/processCsvJsonData";

const EmailReporting = () => {
  const id = useId();
  const [searchVal, setSearchVal] = useState("");
  const deferredSearchVal = useDeferredValue(searchVal);
  const drawer = useDrawer();
  const [isSearching, setIsSearching] = useState({
    found: false,
    searching: false,
  });
  const [searchContacts, setSearchContacts] = useState([]);
  const { getGlobalSearchResults, getMessageReport } = useAxios();
  const [contactData, setContactData] = useState([]);
  const [reports, setReports] = useState({
    reportCount: 0,
    reports: [],
    isLoading: false,
  });
  // Searching
  useEffect(() => {
    setSearchContacts([]);
    if (deferredSearchVal.trim() !== "") {
      setIsSearching((prev) => {
        return {
          ...prev,
          searching: true,
        };
      });
      getGlobalSearchResults(deferredSearchVal)
        .then((res) => {
          if (res.data.lead) {
            if (res.data.lead.length === 0) {
              setSearchContacts([]);
              setIsSearching((prev) => {
                return {
                  ...prev,
                  searching: false,
                  found: false,
                };
              });
            } else {
              let contacts = res.data.lead.map((item) => {
                return { name: item?.name, email: item?.email[0] };
              });
              setSearchContacts(contacts);
              setIsSearching((prev) => {
                return {
                  ...prev,
                  searching: false,
                  found: true,
                };
              });
            }
          } else {
            setSearchContacts([]);
            setIsSearching((prev) => {
              return {
                ...prev,
                searching: false,
                found: false,
              };
            });
          }
        })
        .catch((err) => {
          setSearchContacts([]);
          setIsSearching((prev) => {
            return {
              ...prev,
              searching: false,
              found: false,
            };
          });
          console.log(err);
        });
    }
  }, [deferredSearchVal]);

  // Getting report
  useEffect(() => {
    (async function () {
      setReports({
        ...reports,
        isLoading: true,
      });
      let response = await getMessageReport("email");
      setReports({
        reports: response?.data?.reports,
        reportCount: response?.data?.count,
        isLoading: false,
      });
    })();
  }, []);

  // CSV TO JSON
  // Csv to object
  function csvToJson(csv) {
    setIsSearching({
      found: false,
      searching: true,
    });
    Papa.parse(csv, {
      delimiter: ",",
      download: true,
      complete: (result) => {
        let prcessedData = processCsvData(result.data);
        let data = prcessedData.filter(
          (data) =>
            data.email.trim() !== "" &&
            [...contactData].findIndex((item) => {
              return item.email === data.email;
            }) === -1
        );
        if (data.length === 0) {
          setIsSearching({
            found: false,
            searching: false,
          });
        } else {
          setIsSearching({
            found: true,
            searching: false,
          });
          setContactData((prev) => {
            return [...data, ...prev];
          });
        }
      },
      error: (error) => {
        if (error) {
          setIsSearching({
            found: false,
            searching: false,
          });
          toast.error(`Something Went Wrong !
               hint: Check the link or file`);
        }
      },
    });
  }

  //   All Handler use here
  const handleSearchContactFromDb = (event) => {
    if (event.target.value === "") {
      setSearchContacts([]);
      return false;
    }
    setSearchVal(event.target.value);
  };
  //   Add to sort list handler
  const handleAddToContactFromSearchResult = (item) => {
    const itemIndex = [...contactData].findIndex(
      (data) => data.email === item.email
    );
    if (itemIndex !== -1) {
      toast.dismiss();
      toast.error(item.email + " is already exist in sort list!");
      return;
    }
    setContactData((prev) => {
      return [
        {
          name: item.name,
          email: item.email,
        },
        ...prev,
      ];
    });
    toast.dismiss();
    toast.success(item.name + " is Added to contact list");
  };

  //   Remove from sort list handler
  const handleContactRemovFromSortList = (item) => {
    const itemIndex = [...contactData].findIndex(
      (data) => data.email === item.email
    );
    let allData = [...contactData];
    allData.splice(itemIndex, 1);
    setContactData(allData);
    toast.dismiss();
    toast.success(item.name + " remove success from sortList");
  };

  //   Handle Mesage Drawer
  const handleMessageDrawer = () => {
    let sendAbleData = contactData.map((item) => {
      return {
        name: item.name,
        email: [item.email],
      };
    });
    drawer.show(<SendMailDrawer data={sendAbleData} />);
  };

  // Handler Report Reload
  const handleReloadReport = async () => {
    setReports({
      ...reports,
      isLoading: true,
    });
    let response = await getMessageReport("email");
    setReports({
      reports: response?.data?.reports,
      reportCount: response?.data?.count,
      isLoading: false,
    });
  };

  return (
    <div>
      <div className="h4">Email Department</div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <div className="h5">Send Email</div>
            </div>
            <div className="card-body">
              <div className="contactSearch">
                <label htmlFor={id}>Search Contact</label>
                <input
                  onChange={handleSearchContactFromDb}
                  id={id}
                  placeholder="Search Contact from database"
                  className="form-control form-control-sm"
                  autoComplete="off"
                  type="search"
                />
              </div>
              <div className="contact-import my-2">
                <label htmlFor={id}>Import Contact from google</label>
                <input
                  className="form-control form-control-sm"
                  autoComplete="off"
                  onChange={(e) => {
                    if (e.target.value.trim() !== "") {
                      csvToJson(e.target.value);
                    }
                  }}
                  placeholder="Input your google cdn"
                  type="text"
                />
              </div>
              <div className="contact-display my-2 border p-2">
                <div className="header">
                  <div
                    style={{ justifyContent: "space-between" }}
                    className="titleCounts d-flex"
                  >
                    <strong>
                      Contact Display
                      {isSearching.searching ? "| Loading..." : ""}
                    </strong>
                    <div className="count">
                      <strong>{contactData.length} Found !</strong>
                    </div>
                  </div>
                  <hr className="my-2" />
                </div>
                <div
                  style={{
                    maxHeight: "300px",
                    overflow: "hidden",
                    overflowY: "auto",
                  }}
                  className="contacts-table"
                >
                  {searchContacts.length === 0 ? (
                    ""
                  ) : (
                    <>
                      <div
                        style={{ justifyContent: "space-between" }}
                        className="titleCounts d-flex"
                      >
                        <strong>Search Results</strong>
                        <div className="count">
                          <strong>{searchContacts.length} Found !</strong>
                        </div>
                      </div>
                      {searchContacts.map((item, index) => {
                        return (
                          <div
                            key={"contactTable" + index + item.email}
                            className="row px-2 bg-warning"
                          >
                            <div className="col">{item.name}</div>
                            <div className="col">{item.email}</div>
                            <div
                              onClick={() =>
                                handleAddToContactFromSearchResult(item)
                              }
                              style={{
                                cursor: "pointer",
                              }}
                              className="col-1 bg-success text-center border"
                            >
                              <i className="bi bi-check"></i>
                            </div>
                          </div>
                        );
                      })}
                      <hr />
                    </>
                  )}
                  {contactData.length === 0 || !contactData ? (
                    <p className="alert alert-warning">Nothing Found</p>
                  ) : (
                    contactData.map((item, index) => {
                      return (
                        <div
                          key={"contactTable" + index + item.email}
                          className="row px-2"
                        >
                          <div className="col">{item.name}</div>
                          <div className="col">{item.email}</div>
                          <div
                            onClick={() => handleContactRemovFromSortList(item)}
                            style={{ cursor: "pointer" }}
                            className="col-1 bg-danger text-center text-light border"
                          >
                            <i className="bi bi-trash"></i>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="actions">
                  <button
                    className="btn btn-success mt-2 w-100 btn-sm"
                    disabled={contactData.length !== 0 && isSearching.searching}
                    onClick={handleMessageDrawer}
                  >
                    Open Drawer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <div className="header">
                <div
                  style={{ justifyContent: "space-between" }}
                  className="titleCounts d-flex"
                >
                  <div className="h5">
                    Email Reports {reports.isLoading ? "| Loading..." : ""}
                  </div>
                  <div className="reload">
                    <button
                      onClick={handleReloadReport}
                      className="btn bg-gradient-success text-white btn-sm"
                    >
                      Load
                    </button>
                  </div>
                </div>
              </div>
              <hr className="my-2" />
            </div>
            <div
              style={{ maxHeight: "400px", overflow: "auto" }}
              className="card-body"
            >
              {reports.reports?.length === 0 ? (
                <p className="alert alert-warning">Not Found !</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Successful</th>
                      <th>Unsuccessful</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.reports?.map((item) => {
                      return (
                        <tr key={item?._id} style={{ verticalAlign: "middle" }}>
                          <td>
                            {new Date(item.createdAt).toLocaleString({
                              dateString: "short",
                              timeString: "dhort",
                            })}
                          </td>
                          <td>{item?.success}</td>
                          <td>{item?.unsuccess}</td>
                          <td>
                            <button
                              onClick={() =>
                                drawer.show(
                                  <ReportDetails data={item?.report} />
                                )
                              }
                              className="btn bg-gradient-amour text-white btn-sm"
                            >
                              Report
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailReporting;
