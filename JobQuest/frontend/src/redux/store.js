import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js"


const store = configureStore({
    reducer: {
      auth: authSlice,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools in non-production environments
  });

export default store;