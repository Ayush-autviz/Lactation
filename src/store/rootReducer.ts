import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { publicAuthApi } from './apis/publicAuthApi';
import { internalApi } from './apis/internalApi';

const rootReducer = combineReducers({
  [publicAuthApi.reducerPath]: publicAuthApi.reducer,
  [internalApi.reducerPath]: internalApi.reducer,
  auth: authReducer,
});

export default rootReducer;