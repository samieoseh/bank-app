export interface loginCredentialsProps {
  username: string;
  password: string;
}

export interface AuthStateProps {
   token: String | null;
    authenticated: boolean | null;
    waitAuthCheck: boolean;
}

interface CustomError extends Error {
  response?: {
    status?: number;
    data?: any;
  };
}
