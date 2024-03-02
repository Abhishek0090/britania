import { apiSlice } from "~/features/app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/student/login.php",
        method: "POST",
        body: { ...credentials },
      }),
      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: "/student/logingoogle.php",
        method: "POST",
        body: { ...credentials },
      }),

      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    freelancerLogin: builder.mutation({
      query: (credentials) => ({
        url: "/freelancer/login.php",
        method: "POST",
        body: { ...credentials },
      }),
      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    teamLogin: builder.mutation({
      query: (credentials) => ({
        url: "/team/login.php",
        method: "POST",
        body: { ...credentials },
      }),
      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/student/signup.php",
        method: "POST",
        body: { ...credentials },
      }),
      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    googleSignUp: builder.mutation({
      query: (credentials) => ({
        url: "/student/signupgoogle.php",
        method: "POST",
        body: { ...credentials },
      }),
      overrideExisting: true,
      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    googleCombineSign: builder.mutation({
      query: (credentials) => ({
        url: "/student/googleaccount.php",
        method: "POST",
        body: { ...credentials },
      }),
      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    createStudent: builder.mutation({
      query: (credentials) => ({
        url: "/team/createuseraccount.php",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendEmailOTP: builder.mutation({
      query: (email) => ({
        url: "/student/getemailotp.php",
        method: "POST",
        body: { email: email[0] },
      }),
    }),
    sendPhoneOTP: builder.mutation({
      query: (phoneNumber) => ({
        url: "/student/getnumberotp.php",
        method: "POST",
        body: { number: `${phoneNumber}` },
      }),
    }),
    verifyEmailOTP: builder.mutation({
      query: (data) => ({
        url: "/student/verifyemailotp.php",
        method: "POST",
        body: { email: data.email[0], otp: data.otp },
      }),
    }),
    verifyPhoneOTP: builder.mutation({
      query: (data) => ({
        url: "/student/verifynumberotp.php",
        method: "POST",
        body: { ...data },
      }),
    }),

    sendEmailOTPForFreelancer: builder.mutation({
      query: (data) => ({
        url: "/freelancer/getemailotp.php",
        method: "POST",
        body: { email: data?.email[0], category: data?.category },
      }),
    }),

    sendPhoneOTPForFreelancer: builder.mutation({
      query: (data) => ({
        url: "/freelancer/getnumberotp.php",
        method: "POST",
        body: { number: data?.number, category: data?.category },
      }),
    }),

    verifyEmailOTPForFreelancer: builder.mutation({
      query: (data) => ({
        url: "/freelancer/verifyemailotp.php",
        method: "POST",
        body: { email: data.email[0], otp: data.otp },
      }),
    }),
    verifyPhoneOTPForFreelancer: builder.mutation({
      query: (data) => ({
        url: "/freelancer/verifynumberotp.php",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useFreelancerLoginMutation,
  useTeamLoginMutation,
  useSignUpMutation,
  useGoogleSignUpMutation,
  useGoogleCombineSignMutation,
  useCreateStudentMutation,
  useSendEmailOTPMutation,
  useSendPhoneOTPMutation,
  useVerifyEmailOTPMutation,
  useVerifyPhoneOTPMutation,
  useSendEmailOTPForFreelancerMutation,
  useSendPhoneOTPForFreelancerMutation,
  useVerifyEmailOTPForFreelancerMutation,
  useVerifyPhoneOTPForFreelancerMutation,
} = authApiSlice;
