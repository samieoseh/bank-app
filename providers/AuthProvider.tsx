import { setCurrentLoggedInUser } from "@/store/authSlice";
import { getValueFor, remove, save } from "@/utils/general-utils";
import axios, { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AuthContext from "@/app/context/AuthContext";
import { AuthStateProps, loginCredentialsProps } from "@/typings/auth-typings";
import { useMutation } from "@tanstack/react-query";

axios.defaults.baseURL = process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL;
export const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState<AuthStateProps>({
    token: null,
    authenticated: null,
    waitAuthCheck: true,
  });
  const router = useRouter();
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);

  const register = async (email: string, password: string) => {
    try {
      await axios.post(
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
    mutationFn: async (credentials: loginCredentialsProps) => {
      const { username, password } = credentials;
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });

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
          const response = await axios.get("/api/users/me");
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
