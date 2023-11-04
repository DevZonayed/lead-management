import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DocumentTitle from "../../components/documentTitle/DocumentTitle";
import useAxios from "../../hooks/auth/useAxios";
import DashBord from "./Dashbord/agent/AgentDashBord";
import ExpairedAlert from "./Dashbord/components/ExpairedAleart";
import FollowUpAleart from "./Dashbord/components/FollowUpAlert";

const Home = () => {
  const { myData, dashbord } = useSelector((state) => state);
  const location = useLocation();
  const adminAccess = ["admin"];
  const { gettDashbordData } = useAxios();

  const agentId = new URLSearchParams(location.search).get("userId");
  const agentName = new URLSearchParams(location.search).get("name");
  const agentRole = new URLSearchParams(location.search).get("role");
  useEffect(() => {
    if (
      agentId &&
      agentName &&
      agentRole &&
      adminAccess.includes(myData.data.role)
    ) {
      if (dashbord.reqCount === 0) {
        gettDashbordData(agentId);
      }
    } else {
      if (dashbord.reqCount === 0) {
        gettDashbordData(myData.data._id);
      }
    }
  }, [agentId, agentName, agentRole, dashbord]);

  return (
    <>
      {/* Change title */}
      <DocumentTitle
        title={`${
          agentId &&
          agentName &&
          agentRole &&
          adminAccess.includes(myData.data.role)
            ? agentName + "'s Dashbord"
            : "Dashbord"
        }`}
      />
      <h5 className="mb-4">
        Hello {myData.data.fullName} welcome to{" "}
        {agentId &&
        agentName &&
        agentRole &&
        adminAccess.includes(myData.data.role)
          ? agentName + "'s "
          : ""}
        {agentId &&
        agentName &&
        agentRole &&
        adminAccess.includes(myData.data.role)
          ? agentRole
          : myData.data.role}{" "}
        Dashbord !
      </h5>
      <div className="row">
        <div className="col">
          <FollowUpAleart
            userName={
              agentId &&
              agentName &&
              agentRole &&
              adminAccess.includes(myData.data.role)
                ? agentName
                : myData.data.fullName
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ExpairedAlert
            userName={
              agentId &&
              agentName &&
              agentRole &&
              adminAccess.includes(myData.data.role)
                ? agentName
                : myData.data.fullName
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <DashBord />
        </div>
      </div>
    </>
  );
};

export default Home;
