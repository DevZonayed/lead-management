import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const sessionSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    handleLoadSessionsReq: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    handleLoadSessionsDone: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    },
    handleLoadSessionsFaield: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    },
    handleAddNewSession: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: [...state.data, { ...payload }],
      };
    },
    resetSessions: () => {
      return initialState;
    },
  },
});

export const {
  handleLoadSessionsDone,
  handleLoadSessionsFaield,
  handleLoadSessionsReq,
  handleAddNewSession,
  resetSessions,
} = sessionSlice.actions;
export default sessionSlice.reducer;
