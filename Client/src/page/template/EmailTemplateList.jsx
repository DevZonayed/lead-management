import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDrawer from "../../components/Drawer/hook/useDrawer";
import useAxios from "../../hooks/auth/useAxios";

const EmailTemplateList = () => {
  const { createEmailTemplate, templateLoading, getAllEmailTemplate } =
    useAxios();
  // Redux Store
  const { mailTemp } = useSelector((state) => state);
  const navigate = useNavigate();
  const [templateInfo, setTemplateInfo] = useState({
    title: "",
  });

  const drawer = useDrawer();

  useEffect(() => {
    if (mailTemp.data.length === 0) {
      getAllEmailTemplate();
    }
  }, []);
  // Request Handler
  const handleCreateRequest = () => {
    createEmailTemplate(templateInfo.title);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">Add new Template</div>
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="add-new-form">
                    <input
                      value={templateInfo.title}
                      onChange={(e) =>
                        setTemplateInfo((prev) => {
                          return { ...prev, title: e.target.value };
                        })
                      }
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Add a unique Template title"
                    />
                  </div>
                </div>
                <div className="col-3">
                  {templateLoading ? (
                    <h4 className="text-center">Loading...</h4>
                  ) : (
                    <button
                      onClick={handleCreateRequest}
                      className="btn w-100 btn-sm btn-primary"
                    >
                      Add New
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">Template List</div>
            <div className="card-body">
              <div className="table-responsive mt-3">
                <table className="table align-middle">
                  <thead className="table-secondary">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Create At</th>
                      <th>Update At</th>
                      <th>Create By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mailTemp.data.length !== 0 &&
                      mailTemp.data.map((item, index) => {
                        return (
                          <tr key={`templateIndex${index}`}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>
                              {new Date(item.createdAt).toLocaleString("en", {
                                dateStyle: "medium",
                                timeStyle: "medium",
                              })}
                            </td>
                            <td>
                              {new Date(item.updatedAt).toLocaleString("en", {
                                dateStyle: "medium",
                                timeStyle: "medium",
                              })}
                            </td>
                            <td>{item.createBy.name}</td>
                            <td>
                              <div className="table-actions d-flex align-items-center gap-3 fs-6">
                                <span
                                  style={{ cursor: "pointer" }}
                                  className="text-primary"
                                  title="Views"
                                  onClick={() => {
                                    drawer.show(
                                      <>
                                        <div
                                          style={{ height: "95vh" }}
                                          className="card"
                                        >
                                          <div className="card-body">
                                            <iframe
                                              title="Lead mail template preview"
                                              style={{
                                                width: "100%",
                                                minHeight: "100%",
                                              }}
                                              srcDoc={`${item.html}`}
                                            ></iframe>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  }}
                                >
                                  <i className="bi bi-eye-fill"></i>
                                </span>
                                <span
                                  style={{ cursor: "pointer" }}
                                  className="text-warning"
                                  title="Edit"
                                  onClick={() => {
                                    navigate(`/buildemailtemplate/${item._id}`);
                                  }}
                                >
                                  <i className="bi bi-pencil-fill"></i>
                                </span>
                                <span
                                  style={{ cursor: "pointer" }}
                                  title="Deactive"
                                  className="text-danger"
                                >
                                  <i className="bi bi-trash-fill"></i>
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateList;
