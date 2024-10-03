import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserRegistrationData {
  phoneNumber: string;
  emailAddress: string;
  emailVerified: boolean;
  token: string
  address: string
}

export interface AuthState {
  userRegistrationData: UserRegistrationData;
}

const initialState: AuthState = {
  userRegistrationData: {
    phoneNumber: "",
    emailAddress: "",
    emailVerified: false,
    token: "",
    address: ""
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRegistrationData: (state, action: PayloadAction<Partial<UserRegistrationData>>) => {
      state.userRegistrationData = {
        ...state.userRegistrationData,
        ...action.payload,
      };
    },
  },
});

// Export the actions
export const { setUserRegistrationData } = authSlice.actions;

// Selector
export const selectUserRegistrationData = (state: { auth: AuthState }): UserRegistrationData => 
  state.auth.userRegistrationData;

// Export the reducer
export default authSlice.reducer;
