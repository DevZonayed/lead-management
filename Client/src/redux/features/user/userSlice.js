import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      _id: "",
      firstName: "",
      lastName: "",
      fullName: "",
      phone: "",
      email: "",
      isActive: false,
      role: "",
      extraPhone: [],
      extraEmail: [],
    },
  ],
};

export const userSlice = createSlice({
  name: "alluser",
  initialState,
  reducers: {
    handleUserInsert: (state, { payload }) => {
      const { data } = payload;
      return {
        ...state,
        data,
      };
    },
    resetUsers: () => {
      return initialState;
    },
  },
});

export const { handleUserInsert, resetUsers } = userSlice.actions;
export default userSlice.reducer;
