import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reqCount: 0,
  error: null,
  data: {
    todaysLeads: {
      completed: [],
      expairedCall: [],
      others: [],
      total: [],
    },
    tomorrowLeads: {
      completed: [],
      expairedCall: [],
      others: [],
      total: [],
    },
    allLeads: {
      completed: [],
      expairedCall: [],
      others: [],
      total: [],
    },
    allFollowUps: {
      allFollowUps: [],
      followUpDone: [],
    },
    agentsReport: [],
    orderReport: [],
  },
};

const dashbordSlice = createSlice({
  name: "dashbord",
  initialState,
  reducers: {
    handleDashbordDataReq: (state) => {
      return {
        ...state,
        isLoading: true,
        reqCount: state.reqCount + 1,
      };
    },
    handleDashbordDataReqDone: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          ...payload,
        },
      };
    },
    handleDashbordDataReqFaield: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    },
    resetDashbord: () => {
      return initialState;
    },
    handleAgentReportGetSuccessful: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          agentsReport: payload,
        },
      };
    },
  },
});

export const {
  handleDashbordDataReq,
  handleDashbordDataReqDone,
  handleDashbordDataReqFaield,
  resetDashbord,
  handleAgentReportGetSuccessful,
} = dashbordSlice.actions;

export default dashbordSlice.reducer;
