import { apiSlice } from '~/features/app/api/apiSlice';

export const freelancerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    technicalFreelancerSignUp: builder.mutation({
      query: (credentials) => ({
        url: '/freelancer/freelancersignuptechnical.php',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    nonTechnicalFreelancerSignUp: builder.mutation({
      query: (credentials) => ({
        url: 'freelancer/freelancersignupnontechnical.php',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    writerFreelancerSignUp: builder.mutation({
      query: (credentials) => ({
        url: 'freelancer/freelacnersignupwriter.php',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useTechnicalFreelancerSignUpMutation,
  useNonTechnicalFreelancerSignUpMutation,
  useWriterFreelancerSignUpMutation,
} = freelancerApiSlice;
