import React from "react";
import GroupingInputs from "./components/GroupingInputs";
import GroupingReports from "./components/GroupingReports";

const Grouping = () => {
  return (
    <div>
      <div className="row">
        {/* Grouping Inputs */}
        <div className="col-lg-6 col-12">
          <GroupingInputs />
        </div>
        {/* Grouping Reports */}
        <div className="col-lg-6 col-12">
          <GroupingReports />
        </div>
      </div>
    </div>
  );
};

export default Grouping;
