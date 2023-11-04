import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  manualCount: 0,
  dynamiCount: 0,
};

const bulkEntry = createSlice({
  name: "bulkEntry",
  initialState,
  reducers: {
    handleAddBulkEntry: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        data: [{ ...payload }, ...state.data],
        error: null,
      };
    },
    handleBulkEntryRequestSend: (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    handleBulkEntryRequestFail: (state, { payload }) => {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    },
    handleGetAllBulkEntry: (state, { payload }) => {
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    },
    handleGetPageBulkEntry: (state, { payload }) => {
      return {
        ...state,
        data: [...state.data, ...payload.data],
        manualCount:
          payload.manualCount !== 0 ? payload.manualCount : state.manualCount,
        dynamiCount:
          payload.dynamiCount !== 0 ? payload.dynamiCount : state.dynamiCount,
        isLoading: false,
      };
    },
    resetBulkEntry: () => {
      return initialState;
    },
  },
});

export const {
  handleAddBulkEntry,
  handleBulkEntryRequestSend,
  handleBulkEntryRequestFail,
  handleGetAllBulkEntry,
  resetBulkEntry,
  handleGetPageBulkEntry,
} = bulkEntry.actions;

export default bulkEntry.reducer;
