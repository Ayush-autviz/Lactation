import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';

export const publicAuthApi = createApi({
  reducerPath: 'publicAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000', // Adjust base URL as needed
    // prepareHeaders: (headers, { getState }) => {
    //   // Access the Redux state
    //   const state = getState() as RootState;
    //   const domain = state.auth.domain; // Assuming 'auth' is the slice name in your store
    //   // console.log(domain,'domainn')
    //   // headers.set('Host', `${domain}`);
    //   // Set the Host header dynamically if domain exists, otherwise use a default
    //   // if (domain) {
        
    //   // } else {
    //   //   headers.set('Host', 'kaku.localhost'); // Fallback default
    //   // }

    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { status: string; message:string; data: { id: string; refresh: string; access:string;user:any } },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: 'public/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<
      { status: string; message:string; data:any },
      { email: string }
    >({
      query: (userData) => ({
        url: 'public/forgot-password/',
        method: 'POST',
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation<
    { status: string; message:string; data:any },
    { email:string,otp:string }
  >({
    query: (userData) => ({
      url: 'public/verify-otp/',
      method: 'POST',
      body: userData,
    }),
  }),
  resetPassword: builder.mutation<
  { status: string; message:string; data:any },
  { email:string,reset_token:string,new_password:string,confirm_password:string }
>({
  query: (userData) => ({
    url: 'public/reset-password/',
    method: 'POST',
    body: userData,
  }),
}),
getDomain: builder.mutation<
{ status: string; message:string; data:any },
{ email:string }
>({
query: (userData) => ({
  url: 'tenant/get-domain/',
  method: 'POST',
  body: userData,
}),
}),

  }),
});

// Export hooks for usage in components
export const { useLoginMutation ,useForgotPasswordMutation,useVerifyOtpMutation,useResetPasswordMutation , useGetDomainMutation } = publicAuthApi;