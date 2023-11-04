import React from "react";
import { useId } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAxios from "../../../../hooks/auth/useAxios";

const AssignAgent = ({ data, params }) => {
  const id = useId();
  const { alluser } = useSelector((state) => state);
  const [excludeAdmins, setExcludeAdmins] = useState(false);
  const [agentOpt, setAgenetOpt] = useState(alluser.data);
  const [agent, setAgent] = useState("");
  const [dateLine, setDateLine] = useState("");
  const { assignAgentToLead } = useAxios();

  //   Getting all user from server
  useEffect(() => {
    return setAgent("");
  }, []);
  //   Agent Option Handle
  useEffect(() => {
    if (excludeAdmins) {
      const agents = alluser.data.filter((item) => item.role !== "admin");
      setAgenetOpt(agents);
    } else {
      setAgenetOpt(alluser.data);
    }
  }, [excludeAdmins, alluser]);

  // All Lead Ids
  const allLeadIds = data.map((item) => item.id);
  const handleAgenetSelect = (id) => {
    const selectedUser = alluser.data.filter((item) => item._id === id)[0];
    setAgent(selectedUser);
  };

  const handleAgentAssign = () => {
    const data = { ids: allLeadIds, agent, dateLine };
    if (Object.values(data).includes("")) {
      toast.error("Please fillup all the field");
      return;
    }
    assignAgentToLead(data, params);
  };

  return (
    <div style={{ height: "80vh" }}>
      <div className="card h-100">
        <div className="card-header">
          <h4>Assign Agent for {data.length} Lead.</h4>
        </div>
        <div className="card-body h-100">
          <label htmlFor={id}>Select Agenet</label>
          <div className="agenetSelectWrapper">
            <select
              onChange={(event) => handleAgenetSelect(event.target.value)}
              className="form-control"
              value={agent === "" ? "" : agent?._id}
            >
              <option disabled value="">
                Select Agenet
              </option>
              {agentOpt.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item?.firstName} {item?.lastName} ({item.role})
                  </option>
                );
              })}
            </select>
            <div className="form-check form-switch">
              <input
                onChange={() => setExcludeAdmins((prev) => !prev)}
                className="form-check-input"
                type="checkbox"
                id={id}
              />
              <label className="form-check-label" htmlFor={id}>
                Exclude Admins
              </label>
            </div>
          </div>
          <div className="dateLineWrapper mt-3">
            <label htmlFor={id}>Input a dateLine</label>
            <input
              onChange={(e) => setDateLine(new Date(e.target.value).getTime())}
              className="form-control"
              type="datetime-local"
            />
          </div>
          <div className="action mt-3 text-end">
            <button onClick={handleAgentAssign} className="btn btn-success">
              Assign to {agent === "" ? "Agent" : agent.firstName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignAgent;
