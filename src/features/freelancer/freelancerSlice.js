import { createSlice } from '@reduxjs/toolkit';

const freelancerSlice = createSlice({
  name: 'freelancer',
  initialState: {
    technicalFreelancerFormData: {
      domains: null,
      role: null,
      assignment_type: null,
      qualification: null,
      working_hours: null,
      subject_tags: null,
      past_work_files: null,
      past_work_files_random_number: null,
      past_experience: null,
      work_links: null,
      linkedin: null,
      resume: null,
      resume_random_number: null,
      email_verified: null,
      number_verified: null,
    },
    nonTechnicalFreelancerFormData: {
      domains: null,
      role: null,
      assignment_type: null,
      qualification: null,
      working_hours: null,
      subject_tags: null,
      typing_speed: null,
      past_work_files: null,
      past_work_files_random_number: null,
      past_experience: null,
      work_links: null,
      linkedin: null,
      resume: null,
      resume_random_number: null,
      email_verified: null,
      number_verified: null,
    },
   
  },
  reducers: {
    setTechnicalFreelancerFormData: (state, action) => {
      state.technicalFreelancerFormData = {
        ...state.technicalFreelancerFormData,
        ...action.payload,
      };
    },
    setNonTechnicalFreelancerFormData: (state, action) => {
      state.nonTechnicalFreelancerFormData = {
        ...state.nonTechnicalFreelancerFormData,
        ...action.payload,
      };
    },
  
    clearFreelancerFormData: (state) => {
      state.technicalFreelancerFormData = {
        domains: null,
        role: null,
        assignment_type: null,
        qualification: null,
        working_hours: null,
        subject_tags: null,
        past_work_files: null,
        past_work_files_random_number: null,
        past_experience: null,
        work_links: null,
        linkedin: null,
        resume: null,
        resume_random_number: null,
        email_verified: null,
        number_verified: null,
      };
      state.nonTechnicalFreelancerFormData = {
        domains: null,
        role: null,
        assignment_type: null,
        qualification: null,
        working_hours: null,
        subject_tags: null,
        typing_speed: null,
        past_work_files: null,
        past_work_files_random_number: null,
        past_experience: null,
        work_links: null,
        linkedin: null,
        resume: null,
        resume_random_number: null,
        email_verified: null,
        number_verified: null,
      };
    },
    
   
  },
});

export const {
  setTechnicalFreelancerFormData,
  setNonTechnicalFreelancerFormData, 
  clearFreelancerFormData, 
} = freelancerSlice.actions;

export default freelancerSlice.reducer;
