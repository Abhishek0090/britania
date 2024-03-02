import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost/blue-pen-backend/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-type', 'application/json');
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
