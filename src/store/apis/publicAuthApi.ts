import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const publicAuthApi = createApi({
  reducerPath: 'publicAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'YOUR_API_BASE_URL/auth/', // Adjust base URL as needed
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: { id: string; username: string } },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<
      { token: string; user: { id: string; username: string } },
      { username: string; password: string; email: string }
    >({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useLoginMutation, useSignupMutation } = publicAuthApi;