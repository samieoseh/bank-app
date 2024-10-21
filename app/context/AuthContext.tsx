import { createContext, useContext, useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setCurrentLoggedInUser } from "@/store/authSlice";

interface loginCredentials {
  username: string;
  password: string;
}

interface CustomError extends Error {
  response?: {
    status?: number;
    data?: any;
  };
}

export interface AuthContextProps {
  authState?: {
    token: String | null;
    authenticated: boolean | null;
    waitAuthCheck: boolean;
  };
  login: UseMutationResult<any, CustomError, loginCredentials, unknown>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState<{
    token: String | null;
    authenticated: boolean | null;
    waitAuthCheck: boolean;
  }>({
    token: null,
    authenticated: null,
    waitAuthCheck: true,
  });
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);

  async function save(key: string, value: string) {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.setItem(key, value);
      } else {
        // mobile
        await SecureStore.setItemAsync(key, value.toString());
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  async function remove(key: string) {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.removeItem(key);
      } else {
        // mobile
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error("Error removing data:", error);
    }
  }

  async function getValueFor(key: string) {
    try {
      return Platform.OS === "web"
        ? await AsyncStorage.getItem(key)
        : await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL + "/users",
        {
          email,
          password,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const login = useMutation({
    mutationFn: async (credentials: loginCredentials) => {
      const { username, password } = credentials;
      const response = await axios.post(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL + "/api/users/login",
        {
          username,
          password,
        }
      );

      const data = await response.data;
      setAuthState({
        token: response.data.accessToken,
        authenticated: true,
        waitAuthCheck: false,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;

      await save(
        process.env.EXPO_PUBLIC_JWT_KEY || "jwt_access_token",
        response.data.accessToken
      );

      const { user } = data;
      console.log({ user });
      dispatch(
        setCurrentLoggedInUser({
          fullName: user.fullName,
          accountNumber: user.accountNumber,
          username: user.username,
          emailAddress: user.email,
          balance: user.balance,
          id: user.id,
          active: user.active,
          userRole: user.userRole,
          accountType: user.accountType,
        })
      );

      return data;
    },
  });

  const logout = async () => {
    try {
      await remove(process.env.EXPO_PUBLIC_JWT_KEY || "jwt_access_token");
      axios.defaults.headers.common["Authorization"] = null;

      setAuthState({
        token: null,
        authenticated: false,
        waitAuthCheck: false,
      });
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    authState,
    login,
    logout,
    waitAuthCheck,
    register,
  };

  useEffect(() => {
    const loadTokenAndUser = async () => {
      try {
        const token = await getValueFor(
          process.env.EXPO_PUBLIC_JWT_KEY || "jwt_access_token"
        );
        if (token) {
          setAuthState({
            token,
            authenticated: true,
            waitAuthCheck: false,
          });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // get user
          const response = await axios.get(process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL + "/api/users/me");
          const user = response.data;
          dispatch(
            setCurrentLoggedInUser({
              fullName: user.fullName,
              accountNumber: user.accountNumber,
              username: user.username,
              emailAddress: user.email,
              balance: user.balance,
              id: user.id,
              active: user.active,
              userRole: user.userRole,
              accountType: user.accountType,
            })
          );
        } else {
          setAuthState({
            token: null,
            authenticated: false,
            waitAuthCheck: false,
          });
        }
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          console.error(error.response?.data);
        } else {
          console.error("An error occured!");
        }
      }
    };
    loadTokenAndUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
