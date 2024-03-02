import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    token: null,
    code: null,
    role: null,
    teamData: null,
    teamDomain: null,
    email_otp_verified: null,
    phone_otp_verified: null,
  },
  reducers: {
    setOtpVerified: (state, action) => {
      state.email_otp_verified = {
        ...state.email_otp_verified,
        ...action.payload,
      };
    },

    setFreelancerCredentials: (state, action) => {
      const { freelancer_id, token, role } = action.payload;
      state.id = freelancer_id;
      state.token = token;
      state.role = role;
      localStorage.setItem("token", token);
    },

    setTeamCredentials: (state, action) => {
      const { id, token, role, user_data, domain } = action.payload; 
      state.id = id;
      state.token = token;
      state.role = role;
      state.teamData = user_data;
      state.teamDomain = domain;
      localStorage.setItem("token", token);
    },

    // login
    setCredentials: (state, action) => {
      const { id, token, code } = action.payload;
      state.id = id;
      state.token = token;
      state.code = code;
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("token", token);
    },
    logout: (state, action) => {
      state.id = null;
      state.token = null;
      state.role = null;
      state.code = null;
      state.teamData = null;
      state.teamDomain = null;
      state.email_otp_verified = null;
      state.phone_otp_verified = null;
      localStorage.clear();
    },
  },
});

export const {
  setCredentials,
  logout,
  setOtpVerified,
  setFreelancerCredentials,
  setTeamCredentials,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
