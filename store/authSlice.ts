import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserRegistrationData {
  fullName: string,
  phoneNumber: string;
  username: string;
  emailAddress: string;
  emailVerified: boolean;
  token: string
  address: string, 
  password: string,
  confirmPassword: string,
  transactionPin: string,
  confirmTransactionPin: string,
  balance: number,
  active: boolean,
}

interface UserRole {
  id: string,
  roleName: string,
}

interface AccountType {
  id: string,
  typeName: string,
}

interface CurrentLoggedInUser {
  fullName: string, 
  accountNumber: string,
  username: string,
  emailAddress: string,
  balance: number,
  id: string,
  active: boolean,
  userRole: UserRole,
  accountType: AccountType,
}

export interface AuthState {
  userRegistrationData: UserRegistrationData;
  currentLoggedInUser: CurrentLoggedInUser;
}

const initialState: AuthState = {
  userRegistrationData: {
    fullName: "",
    phoneNumber: "",
    username: "",
    emailAddress: "",
    emailVerified: false,
    token: "",
    address: "",
    password: "",
    confirmPassword: "",
    transactionPin: "",
    confirmTransactionPin: "",
    balance: 0.00,
    active: true,
  },
  currentLoggedInUser: {
    fullName: "",
    accountNumber: "",
    username: "",
    emailAddress: "",
    balance: 0.00,
    id: "",
    active: true,
    userRole: {
      id: "",
      roleName: "",
    },
    accountType: {
      id: "",
      typeName: "",
    }
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
    setCurrentLoggedInUser: (state, action: PayloadAction<CurrentLoggedInUser>) => {
      state.currentLoggedInUser = action.payload;
    }
  },
});

// Export the actions
export const { setUserRegistrationData, setCurrentLoggedInUser } = authSlice.actions;

// Selector
export const selectUserRegistrationData = (state: { auth: AuthState }): UserRegistrationData => 
  state.auth.userRegistrationData;

export const selectCurrentLoggedInUser = (state: { auth: AuthState }): CurrentLoggedInUser => state.auth.currentLoggedInUser;

// Export the reducer
export default authSlice.reducer;
