import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const mailTemplateSlice = createSlice({
  name: "mailTemp",
  initialState,
  reducers: {
    handleCreateTemplate: (state, { payload }) => {
      return {
        ...state,
        data: [...state.data, { ...payload }],
      };
    },
    handleEditTemplate: (state, { payload }) => {
      const index = state.data.findIndex((item) => item._id === payload._id);
      state.data[index] = payload;
    },
    handleGetAllTemplate: (state, { payload }) => {
      return {
        ...state,
        data: payload,
      };
    },
    resetEmailTemplates: () => {
      return initialState;
    },
  },
});

export const {
  handleCreateTemplate,
  handleEditTemplate,
  handleGetAllTemplate,
  resetEmailTemplates,
} = mailTemplateSlice.actions;

export default mailTemplateSlice.reducer;
