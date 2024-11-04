// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionReducer from "./transactionSlice";
import { AuthStateProps } from "@/typings/user-typings";

export interface RootState {
  auth: AuthStateProps;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer
  },
});

export type AppDispatch = typeof store.dispatch;

// Export the store
export default store;
