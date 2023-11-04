import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { DrawerContext } from "../../../Drawer/context/DrawerProvider";
import "./style/editLeadDrawer.css";
import MultiSelectDropDown from "./EditSubComponent/MultiSelectDropDown";
import Tooltip from "../../../ToolTip/Tooltip";
import LeadCommentHistory from "./EditSubComponent/LeadCommentHistory";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import useLocalEditData from "../../hooks/useLocalEditData";
import useAxios from "../../../../hooks/auth/useAxios";
import isDate from "../../../../helper/dateValidatior";
// import { updateLead } from "../../../../redux/features/lead/leadSlice";
const EditLeadDrawer = ({ leadId, event }) => {
  const { setWidth: setDrawerWidth } = useContext(DrawerContext);
  const { myData, lead, events, settings } = useSelector((state) => state);
  const [leadInfo, setLeadInfo] = useLocalEditData(leadId);
  // Followup Date
  const [userProfileOption] = useState([
    "COMPUTER",
    "BEGINNER",
    "STUDENT",
    "CSE",
    "DIPLOMA",
    "JOB-HOLDER",
    "UNEMPLOYED",
    "FOREIGN",
  ]);
  const { updateLead } = useAxios();

  useEffect(() => {
    setDrawerWidth("60vw");
  }, [setDrawerWidth]);
  // All Handler Goes here
  let savedLead = { ...lead.lead.filter((item) => item._id === leadId)[0] };
  let dirftLead = { ...leadInfo };
  // Call Status Handler

  const handleCallStatus = (event) => {
    const leadCopy = { ...savedLead };
    let history = [...leadCopy.history];
    history.push({
      agent: {
        id: myData.data._id,
        name: `${myData.data.fullName}`,
      },
      callAt: Date.now(),
      callStatus: event.target.value,
      callType:
        isDate(leadCopy.followUpStatus.callAt) &&
        /^done$/i.test(event.target.value)
          ? "Follow up"
          : "general",
      session: leadInfo.leadStatus[leadInfo.leadStatus.length - 1].session,
      subject: leadInfo.leadStatus[leadInfo.leadStatus.length - 1].subject,
    });
    leadCopy.history = history;
    if (
      isDate(leadCopy.followUpStatus.callAt) &&
      /^done$/i.test(event.target.value)
    ) {
      leadCopy.followUpStatus = {
        callAt: "",
        agent: {
          name: `${myData.data.fullName}`,
          id: myData.data._id,
        },
        isCalled: true,
      };
    }
    setLeadInfo(leadCopy);
  };
  // Comment Handler
  const handleComment = (event) => {
    if (savedLead.history.length < dirftLead.history.length) {
      let differedLeadCopy = { ...dirftLead };
      let history = [...dirftLead.history];
      history[history.length - 1] = {
        ...history[history.length - 1],
        comments: event.target.value,
      };
      differedLeadCopy.history = history;
      setLeadInfo(differedLeadCopy);
    } else {
      toast.dismiss();
      toast.error("Please give call status first");
      event.target.value = "";
    }
  };
  /**
   * This function for handle User profile Daata
   * @param {*} params
   */
  const handleAccessories = (params) => {
    const leadCopy = { ...leadInfo };
    leadCopy.accessories = params;
    setLeadInfo(leadCopy);
  };

  // Interest Handler
  const handleInterest = (params) => {
    const leadCopy = { ...leadInfo };
    leadCopy.interest = params;
    setLeadInfo(leadCopy);
  };
  // Lead Skill Handler
  const handleLeadSkill = (params) => {
    const leadCopy = { ...leadInfo };
    leadCopy.leadSkill = params;
    setLeadInfo(leadCopy);
  };

  const handleFollowUp = (event) => {
    const leadCopy = { ...leadInfo };
    leadCopy.followUpStatus = {
      callAt: new Date(event).getTime(),
      agent: {
        name: `${myData.data.fullName}`,
        id: myData.data._id,
      },
      isCalled: false,
    };
    setLeadInfo(leadCopy);
  };

  // Handle Data Save
  const handleUpdate = () => {
    const { _id, accessories, followUpStatus, history, interest, leadSkill } =
      leadInfo;
    updateLead(
      _id,
      {
        accessories,
        followUpStatus,
        history,
        interest,
        leadSkill,
      },
      event
    );
  };

  return (
    <div style={{ padding: "10px" }}>
      <div className="row">
        <div className="col-12">
          <h5>{`${leadInfo.name} | ${leadInfo.phone.join(" , ")} | ${new Date(
            leadInfo.leadStatus[leadInfo.leadStatus.length - 1].leadAt
          ).toLocaleString("en", {
            dateStyle: "medium",
            timeStyle: "medium",
          })} | ${[
            ...new Set([...leadInfo.leadStatus.map((item) => item.leadFrom)]),
          ].join(" , ")}`}</h5>
        </div>
      </div>
      <hr />
      <div className="row mb-5">
        <div className="col-7">
          <div className="row">
            <div className="col-3">
              <b>Call Status</b>
            </div>
            <div className="col-9">
              <select
                onChange={(event) => handleCallStatus(event)}
                // defaultValue={""}
                value={
                  savedLead?.history?.length === dirftLead?.history?.length
                    ? ""
                    : dirftLead?.history[dirftLead?.history?.length - 1]
                        ?.callStatus
                }
                className="form-control form-control-sm"
              >
                <option disabled value="">
                  Select One
                </option>
                {settings.data?.callStatus?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <b>User Profile</b>
            </div>
            <div className="col-9">
              <MultiSelectDropDown
                handleValue={handleAccessories}
                menual={false}
                disabled={true}
                limit={7}
                lead={leadInfo}
                isArray={true}
                type="leadAccessories"
                options={[...userProfileOption]}
                defaultValue={leadInfo.accessories}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <b>Interest</b>
            </div>
            <div className="col-9">
              <MultiSelectDropDown
                handleValue={handleInterest}
                menual={false}
                type="interest"
                limit={3}
                lead={leadInfo}
                options={false}
                defaultValue={leadInfo.interest}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <b>Lead Skill</b>
            </div>
            <div className="col-9">
              <MultiSelectDropDown
                handleValue={handleLeadSkill}
                menual={true}
                type="leadSkill"
                limit={8}
                lead={leadInfo}
                options={false}
                defaultValue={leadInfo.leadSkill}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <b>Follow Up </b>
              <Tooltip message="Select Date for specific Date Or Select form event for specific event!">
                ?
              </Tooltip>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col">
                  <DatePicker
                    className="form-control form-control-sm"
                    disabled={
                      savedLead.followUpStatus?.callAt !== null &&
                      isDate(savedLead.followUpStatus?.callAt)
                    }
                    selected={
                      leadInfo?.followUpStatus?.callAt
                        ? new Date(leadInfo?.followUpStatus?.callAt)
                        : Date.now()
                    }
                    onChange={(date) => handleFollowUp(date)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Input FollowUp Date Time"
                    timeInputLabel="Time"
                    showTimeInput
                  />
                </div>
                <div className="col">
                  <select
                    disabled={isDate(savedLead?.followUpStatus?.callAt)}
                    defaultValue={"default"}
                    className="form-control form-control-sm"
                  >
                    <option disabled value="default">
                      Select Event
                    </option>
                    {events.map((item, index) => (
                      <option
                        key={"eventOptions" + index}
                        value={item.startDate}
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
            className="comment_control_wrapper"
          >
            <textarea
              onChange={(event) => handleComment(event)}
              style={{ flexGrow: "1" }}
              className="form-control form-control-sm"
              placeholder="Your Openion !"
              value={
                savedLead?.history?.length === dirftLead?.history?.length
                  ? ""
                  : dirftLead?.history[dirftLead?.history?.length - 1]?.comments
              }
            ></textarea>
            <button
              onClick={handleUpdate}
              className="btn btn-success mt-2 w-100"
            >
              Update Data
            </button>
          </div>
        </div>
      </div>
      {/* Previous History */}
      <LeadCommentHistory history={leadInfo.history} />
    </div>
  );
};

export default EditLeadDrawer;
