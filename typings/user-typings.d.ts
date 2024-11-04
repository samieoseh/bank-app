export interface UserRegistrationDataProps {
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


export interface UserRoleProps {
  id: string,
  roleName: string,
}

export interface AccountTypeProps {
  id: string,
  typeName: string,
}

export interface CurrentLoggedInUserProps {
  fullName: string, 
  accountNumber: string,
  username: string,
  emailAddress: string,
  balance: number,
  id: string,
  active: boolean,
  userRole: UserRoleProps,
  accountType: AccountTypeProps,
}

export interface UserUpdateRegistrationDataProps {
  fullName: string,
  accountNumber: string,
  username: string, 
  password: string, 
  confirmPassword: string,
  transactionPin: string,
  confirmTransactionPin: string
}

export interface AuthStateProps {
  userRegistrationData: UserRegistrationDataProps;
  currentLoggedInUser: CurrentLoggedInUserProps;
  userUpdateRegistrationData: UserUpdateRegistrationDataProps;
}