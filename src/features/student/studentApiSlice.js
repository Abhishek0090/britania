import { apiSlice } from "~/features/app/api/apiSlice";
let token = localStorage.getItem("token");

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalDetails: builder.mutation({
      query: (id) => ({
        url: `/student/getpersonaldetails.php?id=${id}`,
        method: "POST",
        body: { token },
      }),
      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    getAssignmentDetails: builder.mutation({
      query: (id) => ({
        url: "/student/getassignment.php",
        method: "POST",
        body: { token },
      }),
      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    getAssignments: builder.mutation({
      query: (id) => ({
        url: `/student/getassignment.php?id=${id}`,
        method: "POST",
        body: { token },
      }),
      // Use the `force` option to prevent caching
      options: {
        force: true,
      },
    }),
    getWallet: builder.mutation({
      query: (id) => ({
        url: `/student/userwallet.php?id=${id}`,
        method: "POST",
        body: { token },
      }),
    }),
    buyCoins: builder.mutation({
      query: (credentials) => ({
        url: "/student/buycoins.php",
        method: "POST",
        body: { ...credentials, token },
      }),
    }),

    allOtherAssignmentsDetails: builder.mutation({
      query: (credentials) => ({
        url: "/student/submitassignment.php",
        method: "POST",
        body: { ...credentials, token },
      }),
    }),
    allAcademicDetails: builder.mutation({
      query: (credentials) => ({
        url: "/student/submitassignmentacademicwriting.php",
        method: "POST",
        body: { ...credentials, token },
      }),
    }),
    allProgrammingDetails: builder.mutation({
      query: (credentials) => ({
        url: "/student/submitassignmentprogramming.php",
        method: "POST",
        body: { ...credentials, token },
      }),
    }),
    allProfessionalDetails: builder.mutation({
      query: (credentials) => ({
        url: "/student/submitassignmentprofessionalwriting.php",
        method: "POST",
        body: { ...credentials, token },
      }),
    }),
    writingAssignmentDetails: builder.mutation({
      query: (credentials) => ({
        url: "/student/submitassignmentwriting.php",
        method: "POST",
        body: { ...credentials, token },
      }),
    }),
    technicalDrawingAssignmentDetails: builder.mutation({
      query: (credentials) => ({
        url: "/student/submitassignmenttechnicaldrawing.php",
        method: "POST",
        body: { ...credentials, token },
      }),
    }),
    typingAssignmentDetails: builder.mutation({
      query: (credentials) => ({
        url: "/student/submitassignmenttyping.php",
        method: "POST",
        body: { ...credentials, token },
      }),
    }),
    artAndCraftAssignmentDetails: builder.mutation({
      query: (credentials) => ({
        url: "/student/submitassignmentartandcraft.php",
        method: "POST",
        body: { ...credentials, token },
      }),
    }),
  }),
});

export const {
  useGetPersonalDetailsMutation,
  useGetAssignmentDetailsMutation,
  useGetAssignmentsMutation,
  useGetWalletMutation,
  useBuyCoinsMutation,
  useAllOtherAssignmentsDetailsMutation,
  useAllAcademicDetailsMutation,
  useAllProgrammingDetailsMutation,
  useAllProfessionalDetailsMutation,
  useWritingAssignmentDetailsMutation,
  useTechnicalDrawingAssignmentDetailsMutation,
  useTypingAssignmentDetailsMutation,
  useArtAndCraftAssignmentDetailsMutation,
} = studentApiSlice;
