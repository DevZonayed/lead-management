import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MultiSelectDropDown from "./EditSubComponent/MultiSelectDropDown";
import { toast } from "react-toastify";
import useAxios from "../../../../hooks/auth/useAxios";
import { v4 as uuidv4 } from "uuid";
import "./style/editLeadDrawer.css";

const SendMessageDrawer = ({ data }) => {
  const { lead } = useSelector((state) => state);
  const { sendMessage, getSslwirelessSMSBalanceData } = useAxios();
  const [leadsData, setLeadsData] = useState([]);

  const options = useMemo(() => {
    let optionList = [];
    lead.lead.map((item) => optionList.push(...item.phone));
    return optionList;
  }, [lead]);
  // States
  const [singleMsgCount] = useState({
    bn: 67,
    en: 153,
    total: 1000,
  });
  const [leadContact, setLeadContacts] = useState([]);
  const [msgBalance, setMsgBalance] = useState(0);
  const [msgCost, setMsgCost] = useState(0);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [msgLang, setMsgLang] = useState("");
  const [msgSid, setMsgSid] = useState("SOROBINDU");
  const [msgData, setmsgData] = useState({});
  const [isReady, setIsReady] = useState(false);

  // All Use Effects
  useEffect(() => {
    let contactList = [];
    data.map((item) => contactList.push(...item.phone));
    let leadDatas = data.map((item) => ({
      phone: item.phone.join(","),
      name: item.name,
    }));
    setMsgCost(contactList.length);
    setLeadContacts(contactList);
    setLeadsData(leadDatas);

    return () => {
      setMsgCost(0);
      setLeadContacts([]);
      setLeadsData({});
    };
  }, [data]);

  // Message Balance check
  useEffect(() => {
    (async function () {
      try {
        setIsReady(false);
        let result = await getSslwirelessSMSBalanceData(msgSid);
        if (result.data.data.status_code === 200) {
          setMsgBalance(result.data.data.balance);
          setIsReady(true);
        } else {
          setMsgBalance(result.data.data.error_message);
          setIsReady(true);
        }
      } catch (err) {
        console.error(
          `Please Contact with my developer with this error :` + err
        );
      }
    })();
  }, [msgSid]);

  // Formate Message
  useEffect(() => {
    setIsReady(false);
    const handleGenerate = () => {
      // Generate Message Data
      setIsReady(false);
      if (msgType === "dynamic") {
        let dirftMsgData = leadContact.map((item) => {
          let numberRegExp = new RegExp(
            item.replace("+", "").split(" ").join(""),
            "i"
          );
          let uniqueId = uuidv4().split("-").join("").slice(0, 20);
          let nameRegExp = /@name/gi;
          let dataIndex = [...leadsData].findIndex((data) =>
            numberRegExp.test(data.phone)
          );
          return {
            msisdn: item,
            text: message.replace(nameRegExp, leadsData[dataIndex]?.name),
            csms_id: uniqueId,
          };
        });
        setmsgData({
          type: msgType,
          sms: dirftMsgData,
          sid: msgSid,
        });
        setIsReady(true);
      } else if (msgType === "multiple") {
        let uniqueId = uuidv4().split("-").join("").slice(0, 20);
        setmsgData({
          type: msgType,
          msisdn: leadContact,
          sms: message,
          batch_csms_id: uniqueId,
          sid: msgSid,
        });
        setIsReady(true);
      } else if (msgType === "single") {
        let uniqueId = uuidv4().split("-").join("").slice(0, 20);
        setmsgData({
          type: msgType,
          msisdn: leadContact.join(""),
          sms: message,
          csms_id: uniqueId,
          sid: msgSid,
        });
        setIsReady(true);
      }
    };
    let timeout = setTimeout(handleGenerate, 2000);

    return () => clearTimeout(timeout, handleGenerate);
  }, [message, msgSid]);

  // All Handlers
  const handleContactNumber = (params) => {
    setLeadContacts(params);
  };

  const handleMessageSend = () => {
    if (window.confirm("Careful admin! Are you sure to send to all?")) {
      sendMessage(msgData);
      setMessage("");
      setIsReady(false);
    } else {
      return false;
    }
  };

  /**
   * This handler will help to manage all message conditons
   * @param {Input event} event
   * @returns
   */
  const handleMessageCondition = (event) => {
    // Balence Warning
    if (event.target.value.length >= singleMsgCount.total) {
      if (event.nativeEvent.data !== null) {
        toast.dismiss();
        toast.error("Maximum length reached");
        return false;
      }
    }
    if (msgBalance <= msgCost) {
      if (event.nativeEvent.data !== null) {
        toast.dismiss();
        toast.error("Balance Error");
        return false;
      }
    }
    // Set to message state
    setMessage(event.target.value);
    // Detact Language and fill dynamicly
    const detactBanglaExp =
      /(?:ড়|ঢ|়|ঁ|ং|ঃ|অ|আ|ই|ঈ|উ|ঊ|ঋ|ঌ|এ|ঐ|ও|ঔ|ক|খ|গ|ঘ|ঙ|চ|ছ|জ|ঝ|ঞ|ট|ঠ|ড|ঢ|ণ|ত|থ|দ|ধ|ন|প|ফ|ব|ব|ভ|ম|ম|য|র|ল|শ|ষ|স|হ|া|ি|ী|ু|ূ|ৃ|ৄ|ে|ৈ|ো|ৌ|্|ৎ|ড়|ঢ়|য়)+/gm;
    if (detactBanglaExp.test(event.target.value)) {
      setMsgLang("bn");
    } else {
      setMsgLang("en");
    }
    // Detact Message Type
    const dynamicExp = /@name/i;
    if (leadContact.length === 1 && !dynamicExp.test(event.target.value)) {
      setMsgType("single");
    } else if (leadContact.length > 1 && !dynamicExp.test(event.target.value)) {
      setMsgType("multiple");
    }
    if (dynamicExp.test(event.target.value)) {
      setMsgType("dynamic");
    }

    // Calculate Message Cost
    let msgInText = Math.ceil(
      event.target.value.length / singleMsgCount[msgLang]
    );
    setMsgCost(leadContact.length * msgInText);
  };

  return (
    <div style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-body">
          <h5>All Contact Number Goes Here!</h5>
          <MultiSelectDropDown
            handleValue={handleContactNumber}
            menual={true}
            disabled={true}
            limit={10000}
            isArray={true}
            options={options}
            defaultValue={leadContact}
          />
          <hr />
          {/* Message Qty */}
          <div className="row">
            <div className="col">
              <h4>Balance : {msgBalance}</h4>
            </div>
            <div className="col">
              <h4>Cost : {msgCost}</h4>
            </div>
          </div>
          <hr />
          {/* Message Configure */}

          <div className="row">
            <div className="col">
              <div className="message-type">
                <h5>Message Type</h5>
                <select
                  className="form-control"
                  value={msgType}
                  onChange={(e) => setMsgType(e.target.value)}
                >
                  <option disabled value="">
                    Select One
                  </option>
                  <option disabled value="single">
                    Single
                  </option>
                  <option disabled value="multiple">
                    Multiple
                  </option>
                  <option disabled value="dynamic">
                    Dynamic
                  </option>
                </select>
              </div>
            </div>
            <div className="col">
              <h5>Message Language</h5>
              <select
                value={msgLang}
                onChange={(e) => setMsgLang(e.target.value)}
                className="form-control"
              >
                <option disabled value="">
                  Select One
                </option>
                <option disabled value="bn">
                  Bangla
                </option>
                <option disabled value="en">
                  English
                </option>
              </select>
            </div>
            <div className="col">
              <h5>Select SID</h5>
              <select
                onChange={(event) => setMsgSid(event.target.value)}
                className="form-control"
              >
                <option value="SOROBINDU">SOROBINDU</option>
                <option value="SOROBINDUNON">SOROBINDUNON</option>
              </select>
            </div>
          </div>
          <h5>Message Body</h5>
          <textarea
            value={message}
            onChange={(e) => {
              handleMessageCondition(e);
            }}
            className="form-control form-control-sm"
            cols="30"
            rows="10"
            placeholder="Type The Message..."
          ></textarea>
          <button
            onClick={handleMessageSend}
            className="btn btn-success mt-3 w-100"
            disabled={
              msgBalance <= msgCost ||
              message === "" ||
              msgType === "" ||
              !isReady
            }
          >
            Send to all
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessageDrawer;
