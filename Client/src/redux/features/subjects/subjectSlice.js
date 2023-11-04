import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    handleLoadSubjectsReq: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    handleLoadSubjectsDone: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    },
    handleLoadSubjectsFaield: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    },
    handleAddNewSubject: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: [...state.data, { ...payload }],
      };
    },
    resetSubjects: () => {
      return initialState;
    },
  },
});

export const {
  handleLoadSubjectsDone,
  handleLoadSubjectsFaield,
  handleLoadSubjectsReq,
  handleAddNewSubject,
  resetSubjects,
} = subjectSlice.actions;
export default subjectSlice.reducer;
