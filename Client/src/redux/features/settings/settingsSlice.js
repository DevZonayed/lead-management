import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  data: {},
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    insertSettings: (state, { payload }) => {
      return {
        isLoading: false,
        error: null,
        data: payload,
      };
    },
    settingsRequesting: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    settingsRequestfail: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    },
    resetSettings: () => {
      return initialState;
    },
  },
});

export const {
  insertSettings,
  settingsRequesting,
  settingsRequestfail,
  resetSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
