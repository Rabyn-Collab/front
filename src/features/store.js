import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import userReducer from './auth/userSlice'
import { blogApi } from "./blog/blogApi";



export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      blogApi.middleware
    ]),
});