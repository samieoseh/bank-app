import { createContext } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import {
  AuthStateProps,
  CustomError,
  loginCredentialsProps,
} from "@/typings/auth-typings";

export interface AuthContextProps {
  authState?: AuthStateProps;
  login: UseMutationResult<any, CustomError, loginCredentialsProps, unknown>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

export default AuthContext;
