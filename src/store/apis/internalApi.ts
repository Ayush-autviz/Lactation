import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..'; // Import RootState from your store

export const internalApi = createApi({
  reducerPath: 'internalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;
      const domain = state.auth.domain;
      console.log(state, 'domainn internal', token, 'token');
      headers.set('Host', `${domain}`);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Appointments', 'RoomSlots'], // Define tag types for clarity
  endpoints: (builder) => ({
    getLactationRooms: builder.query<{ status: string; message: string; data: any }, void>({
      query: () => 'lactation/room/',
    }),
    getBookings: builder.query<{ status: string; message: string; data: any }, void>({
      query: () => 'lactation/bookings/',
      providesTags: ['Appointments'], // Cache tagged with 'Appointments'
    }),
    getBookingsByDate: builder.query<{ status: string; message: string; data: any }, string>({
      query: (date) => `lactation/bookings?date=${date}`,
      providesTags: ['Appointments'], // Cache tagged with 'Appointments'
    }),
    bookRoom: builder.mutation<
      { status: string; message: string; data: any },
      { lactation_room_slot_id: string; booking_date: string }
    >({
      query: (credentials) => ({
        url: 'lactation/bookings/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Appointments', 'RoomSlots'], // Invalidate bookings and room slots
    }),
    getRoomSlots: builder.query<{ status: string; message: string; data: any }, { roomId: string; date?: string }>({
      query: ({ roomId, date }) => {
        const queryParams = new URLSearchParams();
        queryParams.append('room_id', roomId);
        if (date) {
          queryParams.append('date', date);
        }
        return `lactation/room-slots/by_room/?${queryParams.toString()}`;
      },
      providesTags: ['RoomSlots'], // Cache tagged with 'RoomSlots'
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetLactationRoomsQuery,
  useGetRoomSlotsQuery,
  useBookRoomMutation,
  useGetBookingsQuery,
  useGetBookingsByDateQuery,
} = internalApi;