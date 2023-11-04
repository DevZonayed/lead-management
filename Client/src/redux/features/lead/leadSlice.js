import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  lead: [],
};

// {
//   id: "",
//   name: "",
//   email: [""],
//   phone: [""],
//   leadStatus: [
//     {
//       leadFrom: "menual", // It can be facebook page , phone call  , etc
//       leadAt: "Fri | Jul 01, 22 | 04:11 AM", // Lead Create Date Time
//       leadBy: "Jillur Rahman",
//       session: {
//         sessionNo: 1,
//         sessionId: "",
//       },
//     },
//   ],
//   assignStatus: {
//     agents: [
//       {
//         name: "Rasel Sarkar",
//         id: "",
//         assignDate: "Fri | Jul 01, 22 | 04:11 AM",
//         dateLine: "Fri | Jul 10, 22 | 04:11 AM",
//       },
//     ],
//     assignBy: [{ name: "Ridam Paul", id: "" }],
//   },
//   intarest: [
//     {
//       subject: "Html",
//       progress: 0.59, // It will be percentance
//     },
//   ],
//   skillStatus: [
//     {
//       subject: "Html",
//       progress: 0.3,
//     },
//   ],
//   followUpStatus: {
//     callTime: "", // Next Call Date Time
//     agent: {
//       name: "",
//       id: "",
//     },
//     isCalled: false,
//   },
//   history: [
//     {
//       // If session and agent and callTime are same then it will edited otherways add a new history
//       id: "",
//       agent: {
//         name: "Rasel Sarkar",
//         id: "",
//       },
//       callTime: "Fri | Jul 01, 22 | 04:11 AM",
//       callStatus: [{ type: "busy", callCount: 2 }],
//       comments: "",
//     },
//   ],
//   admitionStatus: {
//     isAdmitted: false,
//     admittedAt: null,
//   },
//   entryType: {
//     type: "bulk",
//     name: "Data From sheet 2022",
//     id: "", // Bulk Entry Collection id
//   },
// },

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    getLeadRequest: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    getLeadRequestFaield: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    getLeadSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        lead: payload,
      };
    },
    getLeadChunkSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        lead: [...state.lead, ...payload],
      };
    },
    updateStoreLead: (state, { payload }) => {
      const index = state.lead.findIndex((item) => item._id === payload._id);

      const copyLead = [...state.lead];
      copyLead[index] = payload;

      return {
        ...state,
        isLoading: false,
        lead: copyLead,
      };
    },
    assignAgentToStore: (state, { payload }) => {
      const copyLead = [...state.lead];
      payload.map((item) => {
        const index = state.lead.findIndex((lead) => lead._id === item._id);
        copyLead[index] = item;
      });
      return {
        ...state,
        isLoading: false,
        lead: copyLead,
      };
    },
    resetLeads: () => {
      return initialState;
    },
  },
});

export const {
  getLeadRequest,
  getLeadRequestFaield,
  getLeadSuccess,
  updateStoreLead,
  assignAgentToStore,
  resetLeads,
  getLeadChunkSuccess,
} = leadSlice.actions;
export default leadSlice.reducer;
