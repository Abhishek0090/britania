import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    allAcademicDetails: {
      student_user_id: null,
      assignment_type: null,
      title: null,
      description: null,
      level: null,
      budget: null,
      deadline: null,
      assignment_files: null,
      assignment_files_random_number: null,
    },
    allProgrammingDetails: {
      student_user_id: null,
      assignment_type: null,
      title: null,
      description: null,
      level: null,
      budget: null,
      deadline: null,
      assignment_files: null,
      assignment_files_random_number: null,
    },
    allProfessionalDetails: {
      student_user_id: null,
      assignment_type: null,
      description: null,
      level: null,
      budget: null,
      deadline: null,
      assignment_files: null,
      assignment_files_random_number: null,
    },
    allPlagiarismDetails: {
      student_user_id: null,
      assignment_id: null,
      number_of_files: null,
      assignment_array: null,
      price: null,
      amount: null,
      link: null,
      assignment_files: null,
      assignment_files_random_number: null,
    },
    allNonLoggedPlagiarismDetails: {
      student_user_id: null,
      assignment_array: null,
      assignment_id: null,
      name: null,
      number_of_files: null,
      price: null,
      amount: null,
      link: null,
      assignment_files: null,
      assignment_files_random_number: null,
    },

    allBHFormDetails: {
      student_user_id: null,
      assignment_array: null,
      assignment_id: null,
      name: null,
      number_of_files: null,
      price: null,
      amount: null,
      link: null,
      assignment_files: null,
      assignment_files_random_number: null,
    },
  },
  reducers: {
    setAllAcademicDetails: (state, action) => {
      state.allAcademicDetails = {
        ...state.allAcademicDetails,
        ...action.payload,
      };
    },
    setAllProgrammingDetails: (state, action) => {
      state.allProgrammingDetails = {
        ...state.allProgrammingDetails,
        ...action.payload,
      };
    },
    setAllProfessionalDetails: (state, action) => {
      state.allProfessionalDetails = {
        ...state.allProfessionalDetails,
        ...action.payload,
      };
    },
    setAllPlagiarismDetails: (state, action) => {
      state.allPlagiarismDetails = {
        ...state.allPlagiarismDetails,
        ...action.payload,
      };
    },
    setAllNonLoggedPlagiarismDetails: (state, action) => {
      state.allNonLoggedPlagiarismDetails = {
        ...state.allNonLoggedPlagiarismDetails,
        ...action.payload,
      };
    },
    setAllBHFormDetails: (state, action) => {
      state.allBHFormDetails = {
        ...state.allBHFormDetails,
        ...action.payload,
      };
    }, 
    clearAllAcademicDetails: (state) => {
      state.allAcademicDetails = {
        student_user_id: null,
        assignment_type: null,
        title: null,
        description: null,
        level: null,
        budget: null,
        deadline: null,
        assignment_files: null,
        assignment_files_random_number: null,
      };
    },
    clearAllProgrammingDetails: (state) => {
      state.allProgrammingDetails = {
        student_user_id: null,
        assignment_type: null,
        title: null,
        description: null,
        level: null,
        budget: null,
        deadline: null,
        assignment_files: null,
        assignment_files_random_number: null,
      };
    },
    clearAllProfessionalDetails: (state) => {
      state.allProfessionalDetails = {
        student_user_id: null,
        assignment_type: null,
        title: null,
        description: null,
        level: null,
        budget: null,
        deadline: null,
        assignment_files: null,
        assignment_files_random_number: null,
      };
    },
    clearAllPlagiarismDetails: (state) => {
      state.allPlagiarismDetails = {
        student_user_id: null,
        assignment_id: null,
        number_of_files: null,
        assignment_array: null,

        price: null,
        amount: null,
        link: null,
        assignment_files: null,
        assignment_files_random_number: null,
      };
    },
    clearAllNonLoggedPlagiarismDetails: (state) => {
      state.allPlagiarismDetails = {
        student_user_id: null,
        assignment_id: null,
        assignment_array: null,
        name: null,
        number_of_files: null,
        price: null,
        amount: null,
        link: null,
        assignment_files: null,
        assignment_files_random_number: null,
      };
    },
    clearAllBHFormDetails: (state) => {
      state.allBHFormDetails = {
        student_user_id: null,
        assignment_id: null,
        assignment_array: null,
        name: null,
        number_of_files: null,
        price: null,
        amount: null,
        link: null,
        assignment_files: null,
        assignment_files_random_number: null,
      };
    },
   
  },
});

export const {
  setAllAcademicDetails,
  setAllProgrammingDetails,
  setAllProfessionalDetails,
  setAllPlagiarismDetails,
  setAllNonLoggedPlagiarismDetails,
  setAllBHFormDetails, 
  clearAllAcademicDetails,
  clearAllProgrammingDetails,
  clearAllProfessionalDetails,
  clearAllPlagiarismDetails,
  clearAllNonLoggedPlagiarismDetails,
  clearAllBHFormDetails, 
} = studentSlice.actions;

export default studentSlice.reducer;
