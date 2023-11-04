import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLogin: false,
  isLoading: true,
  loginReq: false,
  data: {
    email: "",
    extraEmail: [],
    extraPhone: [],
    firstName: "",
    fullName: "",
    isActive: false,
    lastName: "",
    accessories: [],
    phone: "",
    role: "",
    _id: "",
  },
};

export const meSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLoginReq: (state) => {
      return {
        ...state,
        loginReq: true,
      };
    },
    handleLogin: (state, { payload }) => {
      const { token, data } = payload;
      return {
        ...state,
        isLoading: false,
        loginReq: false,
        isLogin: true,
        token,
        data,
      };
    },
    handleLoginFaield: (state) => {
      return {
        ...state,
        isLoading: false,
        loginReq: false,
        isLogin: false,
      };
    },
    handleLogout: () => {
      return {
        token: "",
        isLogin: false,
        loginReq: false,
        isLoading: false,
        data: {
          email: "",
          extraEmail: [],
          extraPhone: [],
          firstName: "",
          fullName: "",
          isActive: false,
          lastName: "",
          phone: "",
          role: "",
          _id: "",
        },
      };
    },
    handleAddAccessories: (state, { payload }) => {
      return {
        ...state,
        data: {
          ...state.data,
          accessories: payload,
        },
      };
    },
  },
});

export const {
  handleLogin,
  handleLoginFaield,
  handleLogout,
  handleAddAccessories,
  handleLoginReq,
} = meSlice.actions;
export default meSlice.reducer;
