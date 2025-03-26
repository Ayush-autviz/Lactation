import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..'; // Import RootState from your store

export const internalApi = createApi({
  reducerPath: 'internalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'YOUR_API_BASE_URL/api/', // Adjust base URL as needed
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<{ id: string; username: string; email: string }, void>({
      query: () => 'profile',
    }),
    updateProfile: builder.mutation<
      { id: string; username: string; email: string },
      { username?: string; email?: string }
    >({
      query: (updates) => ({
        url: 'profile',
        method: 'PUT',
        body: updates,
      }),
    }),
    getProtectedData: builder.query<{ data: string[] }, void>({
      query: () => 'data',
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useGetProtectedDataQuery,
} = internalApi;