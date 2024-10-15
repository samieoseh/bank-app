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

interface UserUpdateRegistrationData {
  fullName: string,
  accountNumber: string,
  username: string, 
  password: string, 
  confirmPassword: string,
  transactionPin: string,
  confirmTransactionPin: string
}

export interface AuthState {
  userRegistrationData: UserRegistrationData;
  currentLoggedInUser: CurrentLoggedInUser;
  userUpdateRegistrationData: UserUpdateRegistrationData;
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

  userUpdateRegistrationData: {
    fullName: "",
    accountNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    transactionPin: "",
    confirmTransactionPin: "",
  }
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

    setUserUpdateRegistrationData: (state, action: PayloadAction<Partial<UserUpdateRegistrationData>>) => {
      state.userUpdateRegistrationData = {
        ...state.userUpdateRegistrationData,
        ...action.payload,
      }
    },
    resetUserRegistrationData: (state) => {
      state.userRegistrationData = initialState.userRegistrationData;
    },
    resetUserUpdateRegistrationData: (state) => { 
      state.userUpdateRegistrationData = initialState.userUpdateRegistrationData
    },
    setCurrentLoggedInUser: (state, action: PayloadAction<CurrentLoggedInUser>) => {
      state.currentLoggedInUser = action.payload;
    }
  },
});

// Export the actions
export const { setUserRegistrationData, setUserUpdateRegistrationData, resetUserRegistrationData, resetUserUpdateRegistrationData, setCurrentLoggedInUser } = authSlice.actions;

// Selector
export const selectUserRegistrationData = (state: { auth: AuthState }): UserRegistrationData => 
  state.auth.userRegistrationData;

export const selectUserUpdateRegistrationData = (state: { auth: AuthState }): UserUpdateRegistrationData =>
  state.auth.userUpdateRegistrationData;

export const selectCurrentLoggedInUser = (state: { auth: AuthState }): CurrentLoggedInUser => state.auth.currentLoggedInUser;

// Export the reducer
export default authSlice.reducer;
