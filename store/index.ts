// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { AuthState } from "./authSlice"; // Adjust the import path if necessary
import authReducer from "./authSlice";

export interface RootState {
  auth: AuthState;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

// Export the store
export default store;
