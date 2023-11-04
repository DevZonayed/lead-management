import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddAccessories,
  handleLogin,
  handleLoginFaield,
  handleLoginReq,
  handleLogout,
} from "../../redux/features/user/meSlice";
import { useNavigate } from "react-router-dom";
import errorMessageExtractor from "../utils/ErrorMessageExtractor";
import {
  handleUserInsert,
  resetUsers,
} from "../../redux/features/user/userSlice";
import {
  handleAddNewSubject,
  handleLoadSubjectsDone,
  handleLoadSubjectsFaield,
  handleLoadSubjectsReq,
  resetSubjects,
} from "../../redux/features/subjects/subjectSlice";
import {
  handleAddNewSession,
  handleLoadSessionsDone,
  handleLoadSessionsFaield,
  handleLoadSessionsReq,
  resetSessions,
} from "../../redux/features/sessions/sessionSlice";
import {
  handleCreateTemplate,
  handleEditTemplate,
  handleGetAllTemplate,
  resetEmailTemplates,
} from "../../redux/features/Email/templateSlice";
import {
  insertSettings,
  resetSettings,
  settingsRequestfail,
  settingsRequesting,
} from "../../redux/features/settings/settingsSlice";
import {
  handleAddBulkEntry,
  handleBulkEntryRequestFail,
  handleBulkEntryRequestSend,
  handleGetPageBulkEntry,
  resetBulkEntry,
} from "../../redux/features/BulkEntry/bulkEntrySlice";
import {
  assignAgentToStore,
  getLeadChunkSuccess,
  getLeadRequest,
  getLeadRequestFaield,
  getLeadSuccess,
  resetLeads,
  updateStoreLead,
} from "../../redux/features/lead/leadSlice";
import useDrawer from "../../components/Drawer/hook/useDrawer";
import {
  handleAgentReportGetSuccessful,
  handleDashbordDataReq,
  handleDashbordDataReqDone,
  handleDashbordDataReqFaield,
  resetDashbord,
} from "../../redux/features/dashbord/dashbordSlice";
import leadToRowData from "../../components/DataGrid/utils/functions/leadToRowDataCovart";

const useAxios = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myData, lead, sessions } = useSelector((state) => state);
  const drawer = useDrawer();

  /**
   * Running Sessions Update
   */
  const [runningSessions, setRunningSessions] = useState([]);
  useEffect(() => {
    let runningSession = sessions?.data
      ?.filter((item) => new Date(item?.endAt) > Date.now())
      .map((session) => session?._id);
    setRunningSessions(runningSession);
  }, [sessions]);

  // Logout handler
  const handleLogOut = () => {
    removeCookie("token");
    dispatch(handleLogout());
    dispatch(resetSessions());
    dispatch(resetSettings());
    dispatch(resetSubjects());
    dispatch(resetUsers());
    dispatch(resetLeads());
    dispatch(resetEmailTemplates());
    dispatch(resetDashbord());
    dispatch(resetBulkEntry());
    navigate("/login");
  };

  // Axios Config
  const axiosConfig = () => {
    // axios.defaults.baseURL = "https://dev.backend.management.shorobindu.com/";
    axios.defaults.baseURL = "https://backend.management.shorobindu.com/";
    // axios.defaults.baseURL = "http://localhost:7000/";
    axios.defaults.headers.common =
      myData.token !== ""
        ? {
            Authorization: `bearer ${myData.token}`,
          }
        : cookie.token !== undefined
        ? {
            Authorization: `bearer ${cookie.token}`,
          }
        : { Authorization: undefined };
  };

  // ============ Users Controller ==============//
  /**
   * This function will help to login
   * @param {email or phone and password} info
   * @returns
   */
  const login = async (info) => {
    try {
      axiosConfig();
      const { auth, password } = info;
      const redirect = new URLSearchParams(window.location.search).get(
        "redirect"
      );

      // input Validation
      if (!auth || auth === "" || !password || password === "") {
        toast.error("Please provide valid credential !");
        return;
      }
      dispatch(handleLoginReq());
      let response = await axios.post("/api/v1/user/login", {
        auth,
        password,
      });

      if (response.data.data === undefined) {
        handleLogOut();
        toast.error("Something Went Wrong");
      } else {
        // dispatch to me slice in redux
        dispatch(
          handleLogin({ token: response.data.token, data: response.data.data })
        );
        // Set token to cookie
        setCookie("token", response.data.token, {
          maxAge: Date.now() + 3 * 24 * 60 * 60 * 1000,
          path: "/",
        });
        // Send a toast
        toast.dismiss();
        toast.success(response.data.message || "Success");
        navigate(`${redirect ? redirect : "/"}`); // Navigate to the home page
      }
    } catch (err) {
      // dispatch to me slice in redux
      dispatch(handleLoginFaield());
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  /**
   * This function will help to verify token
   * @returns
   */
  const userVerify = async () => {
    try {
      axiosConfig();
      if (cookie.token === undefined) {
        dispatch(handleLoginFaield());
        return;
      }
      const response = await axios.post("/api/v1/user/verify", {});
      if (response.data.data === undefined) {
        handleLogOut();
      } else {
        dispatch(
          handleLogin({ token: response.data.token, data: response.data.data })
        );
      }
      // dispatch to me slice in redux
    } catch (err) {
      handleLogOut();
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  /**
   * This function will help to create user
   * @param {firstName , lastName , phone , email , password , role} data
   */
  const registerUser = async (data) => {
    try {
      axiosConfig();
      let user = await axios.post("/api/v1/user/createuser", {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      toast.success(user.data.message);
      navigate("/allusers");
    } catch (err) {
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };
  /**
   * This will help to get all user
   */
  const getAllUser = async () => {
    try {
      axiosConfig();
      const user = await axios.get("/api/v1/user/alluser");
      dispatch(
        handleUserInsert({
          data: user.data.data,
        })
      );
    } catch (err) {
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // This will help to add accessories to user data
  const addAccessoriesToUser = async (data) => {
    try {
      axiosConfig();
      const { title, url } = data;
      const response = await axios.post("/api/v1/user/addtoaccessories", {
        title,
        url,
      });
      dispatch(handleAddAccessories(response.data.data));
      toast.success(response.data.message);
    } catch (err) {
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };
  // This will help to remove accesories from user data
  const removeFromUserAccessories = async (id) => {
    try {
      axiosConfig();
      const response = await axios.post(
        "/api/v1/user/removefromuseraccessories",
        {
          id,
        }
      );
      dispatch(handleAddAccessories(response.data.data));
      toast.success(response.data.message);
    } catch (err) {
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // ============ Session Controller ==============//
  const getAllSubjects = async () => {
    try {
      axiosConfig();
      dispatch(handleLoadSubjectsReq());
      const subjects = await axios.get("/api/v1/subject/getall");
      dispatch(handleLoadSubjectsDone(subjects.data.data));
    } catch (err) {
      dispatch(handleLoadSubjectsFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Handle createSubject
  const registerSubject = async (title) => {
    try {
      axiosConfig();
      dispatch(handleLoadSubjectsReq());
      const subject = await axios.post("/api/v1/subject/create", {
        title,
      });
      dispatch(handleAddNewSubject(subject.data.data));
      toast.success(subject.data.message);
    } catch (err) {
      dispatch(handleLoadSubjectsFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  /**
   * This will help to delete a subject
   * @param {*} id
   */
  const terminateSubject = async (id) => {
    try {
      axiosConfig();
      dispatch(handleLoadSubjectsReq());
      const response = await axios.post("/api/v1/subject/terminate", {
        _id: id,
      });
      toast.success(response.data.message);
      dispatch(handleLoadSubjectsDone(response.data.data));
    } catch (err) {
      dispatch(handleLoadSubjectsFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // ============ Session Controller ==============//
  const getAllSessions = async () => {
    try {
      axiosConfig();
      dispatch(handleLoadSessionsReq());
      const session = await axios.get("/api/v1/session/getall");
      dispatch(handleLoadSessionsDone(session.data.data));
    } catch (err) {
      dispatch(handleLoadSessionsFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Handle create Sessions
  const registerSession = async ({
    sessionNo,
    subject: subjectInfo,
    startAt,
    endAt,
    leadExpectation,
    studentExpectation,
  }) => {
    try {
      axiosConfig();
      dispatch(handleLoadSessionsReq());
      const response = await axios.post("/api/v1/session/create", {
        sessionNo,
        subject: subjectInfo,
        startAt,
        endAt,
        leadExpectation,
        studentExpectation,
      });
      dispatch(handleAddNewSession(response.data.data));
      getAllSubjects();
      toast.success(response.data.message);
    } catch (err) {
      dispatch(handleLoadSessionsFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  /**
   * This will help to delete a Session
   * @param {*} id
   */
  const terminateSession = async (id) => {
    try {
      axiosConfig();
      dispatch(handleLoadSessionsReq());
      const response = await axios.post("/api/v1/session/terminate", {
        _id: id,
      });
      toast.success(response.data.message);

      dispatch(handleLoadSessionsDone(response.data.data));
      getAllSubjects();
    } catch (err) {
      dispatch(handleLoadSessionsFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // ======== Email Template ===========//
  const [templateIsGetting, setTemplateIsGetting] = useState(false);
  const createEmailTemplate = async (title) => {
    try {
      axiosConfig();
      setTemplateIsGetting(true);
      let response = await axios.post("/api/v1/template/create", {
        title,
      });

      dispatch(handleCreateTemplate(response.data.data));
      navigate(`/buildemailtemplate/${response.data.data._id}`);
      setTemplateIsGetting(false);
    } catch (err) {
      setTemplateIsGetting(false);
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Update Template
  const updateEmailTemplate = async ({ _id, html, editableData }) => {
    try {
      axiosConfig();
      let response = await axios.post("/api/v1/template/edit", {
        _id,
        html,
        editableData,
      });
      dispatch(handleEditTemplate(response.data.data));
      toast.dismiss();
      toast.success("Template Update Successfull !");
    } catch (err) {
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Get all template
  const getAllEmailTemplate = async () => {
    try {
      axiosConfig();
      let response = await axios.get("/api/v1/template/getall");
      dispatch(handleGetAllTemplate(response.data.data));
    } catch (err) {
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // insert Settings Options
  const insertSettingOption = async ({ key, value }) => {
    try {
      axiosConfig();
      dispatch(settingsRequesting());
      let response = await axios.post("/api/v1/settings/insert", {
        key,
        value,
      });
      toast.dismiss();
      toast.success(response.data.message);
      dispatch(insertSettings(response.data.data));
    } catch (err) {
      dispatch(settingsRequestfail(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };
  // getAll Settings Options
  const getAllSettings = async () => {
    try {
      axiosConfig();
      dispatch(settingsRequesting());
      let response = await axios.get("/api/v1/settings/getall");
      dispatch(insertSettings(response.data.data));
      toast.dismiss();
    } catch (err) {
      dispatch(settingsRequestfail(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };
  // Remove a Settings options
  const removeOptionFromSetting = async ({ key, value }) => {
    try {
      axiosConfig();
      dispatch(settingsRequesting());
      let response = await axios.post("/api/v1/settings/pullopt", {
        key,
        value,
      });
      toast.dismiss();
      toast.success(response.data.message);
      dispatch(insertSettings(response.data.data));
    } catch (err) {
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // =================== Lead Request ====================//
  const entryLeadBulkly = async (data) => {
    try {
      axiosConfig();
      dispatch(handleBulkEntryRequestSend());
      const response = await axios.post("/api/v1/lead/bulkentry", {
        ...data,
      });
      if (!response.data.data) {
        toast.error(response.data.message);
        dispatch(handleBulkEntryRequestFail(response.data.message));
        return;
      }
      dispatch(handleAddBulkEntry(response.data.data));
      toast.dismiss();
      toast.success(response.data.message);
      getAllSessions();
      getAllSubjects();
      navigate("/bulkentryReport");
    } catch (err) {
      dispatch(handleBulkEntryRequestFail(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };
  const entryAdmittedLeadBulkly = async (data) => {
    try {
      axiosConfig();
      dispatch(handleBulkEntryRequestSend());
      const response = await axios.post("/api/v1/lead/bulkadmittedentry", {
        ...data,
      });
      if (!response.data.data) {
        toast.error(response.data.message);
        dispatch(handleBulkEntryRequestFail(response.data.message));
        return;
      }
      dispatch(handleAddBulkEntry(response.data.data));
      toast.dismiss();
      toast.success(response.data.message);
      getAllSessions();
      getAllSubjects();
      navigate("/bulkentryReport");
    } catch (err) {
      dispatch(handleBulkEntryRequestFail(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  const getAllBulkEntryReport = async ({ pageNo, pageSize, type }) => {
    try {
      axiosConfig();
      dispatch(handleBulkEntryRequestSend());
      const response = await axios.post("/api/v1/lead/getallbulkentry", {
        pageNo,
        pageSize,
        type,
      });
      dispatch(
        handleGetPageBulkEntry({
          data: response.data.data,
          manualCount: response.data.manualCount,
          dynamiCount: response.data.dynamiCount,
        })
      );
    } catch (err) {
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };
  // Get All Lead
  const getAllLead = async () => {
    try {
      axiosConfig();
      if (lead.lead.length < 2) {
        dispatch(getLeadRequest());
      }
      let response = await axios.get("/api/v1/lead/getalllead");
      dispatch(getLeadSuccess(response.data.data));
    } catch (err) {
      dispatch(getLeadRequestFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Get Leads by ids
  const getLeadsByIds = async (ids, gridRef) => {
    try {
      axiosConfig();

      if (ids.length !== 0) {
        dispatch(getLeadRequest());
      }
      const chunkSize =
        ids.length < 200
          ? Math.ceil(ids.length / 2)
          : Math.ceil(ids.length / 10);
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        // Req with chunks
        let response = await axios.post("/api/v1/lead/getleadsbyid", {
          data: chunk,
        });
        dispatch(getLeadChunkSuccess(response.data.data));
        gridRef.current?.api.applyTransaction({
          add: leadToRowData(response.data.data, runningSessions),
        });
      }
    } catch (err) {
      dispatch(getLeadRequestFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };
  // Update Lead
  const updateLead = async (_id, data, event) => {
    try {
      axiosConfig();
      drawer.hide();
      const response = await axios.post("/api/v1/lead/updatelead", {
        _id,
        data,
      });
      dispatch(updateStoreLead(response.data.data));
      event.node.setData(
        leadToRowData([{ ...response.data.data }])[0],
        runningSessions
      );

      toast.success(response.data.message);
      clearDirft(response.data.data._id);
    } catch (err) {
      dispatch(getLeadRequestFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Assign Agent
  const assignAgentToLead = async ({ ids, agent, dateLine }, params) => {
    try {
      axiosConfig();
      drawer.hide();
      let response = await axios.post("/api/v1/lead/assignagent", {
        ids,
        agent,
        dateLine,
      });
      // Updating Datagrid
      const timer = setTimeout(() => {
        updateDataGridFromRedux(params, response.data.data);

        clearTimeout(timer);
      }, 500);
      dispatch(assignAgentToStore(response.data.data));
      toast.success(response.data.message);
    } catch (err) {
      dispatch(getLeadRequestFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  const updateDataGridFromRedux = (params, data) => {
    const copyLead = [...lead.lead];
    data.map((item) => {
      const index = lead.lead.findIndex((lead) => lead._id === item._id);
      copyLead[index] = item;
    });
    params.api.setRowData(leadToRowData(copyLead, runningSessions));
  };

  // Get Lead for agent
  const getLeadForAgent = async (user, gridRef) => {
    try {
      axiosConfig();
      dispatch(getLeadRequest());
      const response = await axios.post("/api/v1/lead/getleadforagent", {
        user,
      });

      gridRef.current?.api.applyTransaction({
        add: leadToRowData(response.data.data, runningSessions),
      });
      dispatch(getLeadSuccess(response.data.data));
    } catch (err) {
      dispatch(getLeadRequestFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Message Sending
  const sendMessage = async (msgData) => {
    try {
      axiosConfig();
      const response = await axios.post("/api/v1/message/sendsms", {
        msgData,
      });
      toast.success(response.data.message);
    } catch (err) {
      dispatch(getLeadRequestFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };
  // Message Sending
  const getMessageReport = async (type) => {
    try {
      axiosConfig();
      const response = await axios.post("/api/v1/message/report", {
        type,
      });
      return response;
    } catch (err) {
      dispatch(getLeadRequestFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Message Sending
  const sendMail = async ({ mails, mailSub, message, type }) => {
    try {
      axiosConfig();
      const response = await axios.post("/api/v1/mail/send", {
        mails,
        mailSub,
        message,
        type,
      });
      toast.success(response.data.message);
    } catch (err) {
      dispatch(getLeadRequestFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Get agent Dashbord
  const gettDashbordData = async (id) => {
    try {
      axiosConfig();
      dispatch(handleDashbordDataReq());
      const response = await axios.post("/api/v1/dashbord/agent", {
        id,
      });

      dispatch(
        handleDashbordDataReqDone({
          ...response.data.data,
        })
      );
    } catch (err) {
      dispatch(handleDashbordDataReqFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  const getAgentReports = async (sessionId = false) => {
    try {
      axiosConfig();
      dispatch(handleDashbordDataReq());
      const response = await axios.post("/api/v1/dashbord/agentreports", {
        sessionId,
      });
      if (Array.isArray(response.data.data)) {
        dispatch(handleAgentReportGetSuccessful(response.data.data));
      } else {
        dispatch(handleAgentReportGetSuccessful([]));
      }
    } catch (err) {
      dispatch(handleDashbordDataReqFaield(errorMessageExtractor(err)));
      toast.dismiss();
      toast.error(errorMessageExtractor(err));
    }
  };

  // Get Globall Search Results
  const getGlobalSearchResults = async (searchValue) => {
    try {
      axiosConfig();
      const response = await axios.post("/api/v1/general/globalsearch", {
        searchValue,
      });
      return response;
    } catch (err) {
      return err;
    }
  };
  // Return SSLWIRELESS Balance Data
  const getSslwirelessSMSBalanceData = async (sid) => {
    try {
      axiosConfig();
      const response = await axios.post("/api/v1/general/checkmsgbalance", {
        sid,
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  return {
    login,
    userVerify,
    registerUser,
    getAllUser,
    addAccessoriesToUser,
    removeFromUserAccessories,
    getAllSubjects,
    registerSubject,
    terminateSubject,
    getAllSessions,
    registerSession,
    terminateSession,
    createEmailTemplate,
    templateLoading: templateIsGetting,
    updateEmailTemplate,
    getAllEmailTemplate,
    insertSettingOption,
    getAllSettings,
    removeOptionFromSetting,
    entryLeadBulkly,
    entryAdmittedLeadBulkly,
    getAllBulkEntryReport,
    getAllLead,
    getLeadsByIds,
    updateLead,
    assignAgentToLead,
    getLeadForAgent,
    sendMessage,
    sendMail,
    gettDashbordData,
    getGlobalSearchResults,
    getAgentReports,
    getSslwirelessSMSBalanceData,
    getMessageReport,
  };
};

export default useAxios;

// Clear Edit Dirft

function clearDirft(id) {
  let localStoreData = localStorage.getItem("editedData");
  if (JSON.parse(localStoreData).length === 1) {
    localStorage.removeItem("editedData");
    return;
  }
  let newItems = JSON.parse(localStoreData).filter((item) => item._id !== id);
  localStorage.setItem("editedData", JSON.stringify(newItems));
}
