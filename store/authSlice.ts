import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthStateProps, CurrentLoggedInUserProps, UserRegistrationDataProps, UserUpdateRegistrationDataProps } from "@/typings/user-typings";


const initialState: AuthStateProps = {
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

export const getUser = createAsyncThunk("auth/getUser", async () => {
  const response = await axios.get(process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL + `/api/users/me`);
  const data = await response.data;
  console.log('data', data);
  return data;
})
  
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
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state: AuthStateProps, action) => {
      state.currentLoggedInUser = action.payload;
    });
  }
});

// Export the actions
export const { setUserRegistrationData, setUserUpdateRegistrationData, resetUserRegistrationData, resetUserUpdateRegistrationData, setCurrentLoggedInUser } = authSlice.actions;

// Selector
export const selectUserRegistrationData = (state: { auth: AuthStateProps }): UserRegistrationDataProps => 
  state.auth.userRegistrationData;

export const selectUserUpdateRegistrationData = (state: { auth: AuthStateProps }): UserUpdateRegistrationDataProps =>
  state.auth.userUpdateRegistrationData;

export const selectCurrentLoggedInUser = (state: { auth: AuthStateProps }): CurrentLoggedInUserProps => state.auth.currentLoggedInUser;

// Export the reducer
export default authSlice.reducer;
