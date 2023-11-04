import React from "react";
import { useSelector } from "react-redux";
import AdmitionReport from "../components/AdmitionReport";
import AgentPerformance from "../components/AgentPerformance";
import CallStatus from "../components/CallStatus";

const DashBord = () => {
  const { dashbord } = useSelector((state) => state);

  return (
    <div>
      {/* Admition Status */}
      <AdmitionReport />
      <div className="row">
        <CallStatus data={dashbord.data?.todaysLeads} title={"Todays Lead"} />
        <CallStatus
          data={dashbord.data?.tomorrowLeads}
          title={"Tomorrow Lead"}
        />
        <CallStatus data={dashbord.data?.allLeads} title={"All Assign Lead"} />
      </div>

      <div className="row">
        <AgentPerformance />
      </div>
    </div>
  );
};

export default DashBord;
