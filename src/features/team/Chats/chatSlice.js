import { createSlice } from "@reduxjs/toolkit";

//only used for forms purpose

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    allChatCreate: {
      chat_heading: null,
      member_id: null,
      member_name: null,
      chat_id: null,
      members: null,
    },  
    allChatTeamDetails: {  
      assignment_files: null,
      assignment_files_random_number: null,
    },
    
    allChatStudentDetails: { 
      assignment_files: null,
      assignment_files_random_number: null,
    },
    allChatFreelancerDetails: {   
      assignment_files: null,
      assignment_files_random_number: null,
    },
  },
  reducers: {
    setAllChatCreate: (state, action) => {
      state.allChatCreate = {
        ...state.allChatCreate,
        ...action.payload,
      };
    }, 
    setAllChatTeamDetails: (state, action) => {
      state.allChatTeamDetails = {
        ...state.allChatTeamDetails,
        ...action.payload,
      };
    },
    setAllChatStudentDetails: (state, action) => {
      state.allChatStudentDetails = {
        ...state.allChatStudentDetails,
        ...action.payload,
      };
    },
    setAllChatFreelancerDetails: (state, action) => {
      state.allChatFreelancerDetails = {
        ...state.allChatFreelancerDetails,
        ...action.payload,
      };
    },
    clearAllCreateChat: (state) => {
      state.allChatCreate = {
        id: null,
        chat_id: null,
        members: null,
        chat_heading: null,
        chat_users: null,
        created_by_id: null,
        created_by_name: null,
        member_id: null,
        member_name: null,
      };
    },
   
    clearAllChatTeamDetails: (state) => {
      state.allChatTeamDetails = {  
        assignment_files: null,

        assignment_files_random_number: null,
      };
    },
    clearAllChatStudentDetails: (state) => {
      state.allChatStudentDetails = {   
        assignment_files: null,
        assignment_files_random_number: null,
      };
    },
    clearAllChatFreelancerDetails: (state) => {
      state.allChatFreelancerDetails = { 
        assignment_files: null,
        assignment_files_random_number: null,
      };
    },
  },
});

export const {
  setAllChatCreate,
  setAllChatTeamDetails,
  setAllChatStudentDetails,
  setAllChatFreelancerDetails,
  clearAllCreateChat,
  clearAllChatTeamDetails,
  clearAllChatStudentDetails,
  clearAllChatFreelancerDetails,
} = chatSlice.actions;

export default chatSlice.reducer;
