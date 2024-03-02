"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Setup listeners for the API slices
setupListeners(store.dispatch);

// call the refresh token function on every page load
const initializeApp = async () => {
  // await store.dispatch(
  //   apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  // );
  // // Refresh token every 4 minutes (240,000 milliseconds)
  // const refreshTokenInterval = 240000;
  // const refreshToken = async () => {
  //   try {
  //     // Call your refresh token logic here
  //     // For example:
  //     await store.dispatch(
  //       apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  //     );
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //   }
  // };
  // setInterval(refreshToken, refreshTokenInterval);
};

initializeApp();
