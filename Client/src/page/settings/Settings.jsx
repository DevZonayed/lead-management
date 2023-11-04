import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/auth/useAxios";
import OptionsBox from "./subComponents/OptionsBox";

const Settings = () => {
  const { insertSettingOption, removeOptionFromSetting } = useAxios();
  const { settings } = useSelector((state) => state);
  const [options, setOptions] = useState({
    key: "",
    value: "",
  });
  //   This state is only for reseting the input values
  const [optionsVal, setOptionsVal] = useState({
    int: "",
    skl: "",
    sts: "",
  });

  const handleInsert = () => {
    insertSettingOption(options);
    setOptionsVal({
      int: "",
      skl: "",
      sts: "",
    });
  };

  const handleRemove = ({ key, value }) => {
    removeOptionFromSetting({ key, value });
  };

  return (
    <div>
      <div className="header_title">
        <h4 className="text-center">All Options</h4>
      </div>
      <div className="row">
        {/* Interest */}
        <div className="col-lg-4">
          <OptionsBox
            settings={settings}
            setOptions={setOptions}
            optionsVal={optionsVal}
            setOptionsVal={setOptionsVal}
            handleInsert={handleInsert}
            handleRemove={handleRemove}
            title={"Interest"}
            keyName="interest"
            optValKey="int"
          />
        </div>
        {/* Skill */}
        <div className="col-lg-4">
          <OptionsBox
            settings={settings}
            title={"Skill Options"}
            setOptions={setOptions}
            optionsVal={optionsVal}
            setOptionsVal={setOptionsVal}
            handleInsert={handleInsert}
            handleRemove={handleRemove}
            keyName="leadSkill"
            optValKey="skl"
          />
        </div>
        {/* Call Status */}
        <div className="col-lg-4">
          <OptionsBox
            settings={settings}
            title={"Call Status"}
            setOptions={setOptions}
            optionsVal={optionsVal}
            setOptionsVal={setOptionsVal}
            handleInsert={handleInsert}
            handleRemove={handleRemove}
            keyName="callStatus"
            optValKey="sts"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
