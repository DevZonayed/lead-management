import React from "react";
import { upperCaseWithHyphen } from "../../../helper/utils";
import PrivateLoader from "../../../routes/loaders/PrivateLoader";
import "./style/optionBox.css";

const OptionsBox = ({
  settings,
  setOptions,
  optionsVal,
  setOptionsVal,
  handleInsert,
  handleRemove,
  keyName,
  title,
  optValKey,
}) => {
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleInsert();
    }
  };
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-center">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body">
          <div className="card-input d-flex">
            <input
              type="text"
              autoComplete="false"
              onKeyUp={handleKeyUp}
              value={optionsVal[optValKey]}
              onChange={(e) => {
                setOptionsVal((prev) => {
                  return {
                    ...prev,
                    [optValKey]: upperCaseWithHyphen(e.target.value),
                  };
                });
                setOptions({
                  key: keyName,
                  value: upperCaseWithHyphen(e.target.value),
                });
              }}
              placeholder={`Enter a ${keyName} option`}
              className="form-control form-control-sm me-2"
            />
            <button onClick={handleInsert} className="btn btn-primary btn-sm">
              Add
            </button>
          </div>
          <hr className="my-2" />
          <div className="card-listed-item">
            <div className="list-group">
              {settings.isLoading && <PrivateLoader />}
              {settings.data[keyName] === undefined ||
              settings.data[keyName]?.length === 0 ? (
                <p className="alert alert-warning">Not Found !</p>
              ) : (
                settings.data[keyName]?.map((item, index) => {
                  return (
                    <div
                      key={`OptionItem${keyName}${index}`}
                      className="list-group-item"
                    >
                      <div className="item-container justify-content-between d-flex">
                        <div className="list-item">{item}</div>
                        <div className="item-actions">
                          <span
                            style={{ cursor: "pointer" }}
                            className="text-danger h6"
                            onClick={() =>
                              handleRemove({ key: keyName, value: item })
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsBox;
